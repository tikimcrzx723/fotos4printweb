import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = { message: string } | IProduct[] | IProduct;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500mb', // Set desired value here
      responseLimit: false,
    },
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
      break;

    case 'PUT':
      return updateProducts(req, res);
      break;

    case 'POST':
      return createProduct(req, res);
      break;

    default:
      return res.status(400).json({ message: 'Bad request' });
      break;
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await Product.find().sort({ title: 'asc' }).lean();

  await db.disconnect();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });

    return product;
  });

  return res.status(200).json(updatedProducts);
};

const updateProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = '', images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'is not a valid ObjectId' });
  }

  if (images.length < 2) {
    return res.status(400).json({ message: 'At least 2 images are required' });
  }

  try {
    await db.connect();
    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res.status(400).json({ message: 'is not a valid ObjectId' });
    }

    await product.update(req.body);
    await db.disconnect();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(400).json({ message: 'Revidar los logs' });
  }
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [], price } = req.body as IProduct;

  if (images.length < 2) {
    return res.status(400).json({ message: 'At least 2 images are required' });
  }

  try {
    await db.connect();
    const productInDB = await Product.findOne({ slug: req.body.slug });
    if (productInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'A product with this slug already exists' });
    }

    const priceInput = price.filter(
      (p) =>
        p.priceClient !== 0 ||
        p.priceFerderal !== 0 ||
        p.priceFrequnt !== 0 ||
        p.size !== null ||
        p.size !== undefined ||
        p.size !== '' ||
        p.priceClient !== null ||
        p.priceFerderal !== null ||
        p.priceFrequnt !== null ||
        p.priceClient !== undefined ||
        p.priceFerderal !== undefined ||
        p.priceFrequnt !== undefined ||
        p.priceClient > 0 ||
        p.priceFerderal > 0 ||
        p.priceFrequnt > 0
    );

    const product = new Product(...req.body, { price: priceInput });
    await product.save();
    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: 'Review server logs' });
  }
};
