import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { ICompany } from '../../../interfaces';
import { Company } from '../../../models';

type Data =
  | {
      message: string;
    }
  | ICompany;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getCompanyData(req, res);

    default:
      break;
  }
}

const getCompanyData = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const company = await Company.find();
  await db.disconnect();

  return res.status(200).json(company[0]);
};
