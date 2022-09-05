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
}

const deleteImage = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { url = '' } = req.body;
  try {
    const deleted = await imageUpload.deleteFileFromObjectStorage(url);
    return res.status(201).json({ message: 'Deleted Images' });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ message: 'Error By deleted Image' });
  }
};
