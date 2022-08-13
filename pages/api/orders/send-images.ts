import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { getSession } from 'next-auth/react';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return uploadFile(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const saveFile = async (file: formidable.File) => {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath);

  return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, rejectc) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return rejectc(err);
      }

      const filePath = await saveFile(files.file as formidable.File);
      resolve(filePath);
    });
  });
};

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(200).json({ message: 'Your need a start session' });
  }

  const imageUrl = await parseFiles(req);
  return res.status(201).json({ message: imageUrl });
};
