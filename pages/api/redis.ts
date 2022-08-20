import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../models';
import { Client } from 'redis-om';
const client = new Client();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case 'GET':
      return getData(req, res);

    default:
      return res.status(400).json('Bad Request.');
  }
}

const getData = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await client.open(process.env.REDIS_KEY);
  const cacheProducts = await client.get('products');
  if (cacheProducts) {
    await client.close();
    return res.status(200).json(JSON.parse(cacheProducts));
  }
  const products = await Product.find();
  await client.set('products', JSON.stringify(products));
  await client.close();
  return res.json(products);
};
