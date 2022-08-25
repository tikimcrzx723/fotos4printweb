import type { NextApiRequest, NextApiResponse } from 'next';
import { imageUpload } from '../../../../../libs';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return deleteImage(req, res);

    default:
      break;
  }
  res.status(200).json({ message: 'Example' });
}

const deleteImage = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { url = '' } = req.body;
  const deleted = await imageUpload.deleteFileFromObjectStorage(url);
  return res.status(201).json({message:'Deleted Images'});
};
