import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { ICompany } from '../../../../interfaces';
import { Company } from '../../../../models';

type Data =
  | {
      message: string;
    }
  | ICompany[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createCompany(req, res);

    case 'GET':
      return getCompany(req, res);

    default:
      break;
  }
}

const createCompany = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    name,
    deliveryPrice,
    minFreeDelivery,
    address,
    address2,
    zip,
    state,
    city,
    phone,
  } = req.body as ICompany;

  console.log(req.body);

  await db.connect();
  const dbCompany = new Company({
    name,
    deliveryPrice,
    minFreeDelivery,
    address,
    address2,
    zip,
    state,
    city,
    phone,
  });
  await dbCompany.save();
  await db.disconnect();

  return res.status(201).json(req.body);
};

const getCompany = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const dbCompany = await Company.find();
  await db.disconnect();

  return res.status(201).json(dbCompany);
};
