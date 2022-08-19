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

    case 'PUT':
      return updateProducts(req, res);

    case 'POST':
      return createProduct(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const products = await Product.find().sort({ title: 'asc' }).lean();

  await db.disconnect();

  return res.status(200).json(products);
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
  const {
    title,
    description,
    images = [],
    price,
    needImages,
    minIMages,
    slug,
    type,
  } = req.body as IProduct;
  console.log(req.body);

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
        p.priceClient !== 0 &&
        p.priceFerderal !== 0 &&
        p.priceFrequnt !== 0 &&
        p.size !== null &&
        p.size !== undefined &&
        p.size !== '' &&
        p.priceClient !== null &&
        p.priceFerderal !== null &&
        p.priceFrequnt !== null &&
        p.priceClient !== undefined &&
        p.priceFerderal !== undefined &&
        p.priceFrequnt !== undefined &&
        p.priceClient > 0 &&
        p.priceFerderal > 0 &&
        p.priceFrequnt > 0
    );

    const inpPriceMap = priceInput.map((p) => {
      return {
        size: p.size,
        priceClient: Number(p.priceClient),
        priceFrequnt: Number(p.priceFrequnt),
        priceFerderal: Number(p.priceFerderal),
      };
    });

    const body = {
      title,
      description,
      images,
      price: inpPriceMap,
      needImages,
      minIMages,
      slug,
      type,
    };

    if (needImages === false || (needImages as any) === 'false') {
      delete body.minIMages;
    }

    const product = new Product(body);
    await product.save();
    await db.disconnect();

    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res.status(400).json({ message: 'Review server logs' });
  }
};
