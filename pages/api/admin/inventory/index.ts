import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Material } from '../../../../models';
import { IMaterial } from '../../../../interfaces';

type Data =
  | {
      message: string;
    }
  | IMaterial;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createMaterial(req, res);

    default:
      break;
  }
}

const createMaterial = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { body } = req;
  try {
    await db.connect();
    const materialInDB = await Material.findOne({ name: body.name });
    if (materialInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: 'A material with this name already exists' });
    }

    const material = new Material(body);
    await material.save();
    await db.disconnect();

    return res.status(201).json(material);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Review Logs servers' });
  }
};

const updatedMaterial = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { body } = req;
};
