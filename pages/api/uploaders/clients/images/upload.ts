import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { imageUpload } from '../../../../../libs';
import { Order } from '../../../../../models';
import { db } from '../../../../../database';

type Data = {
  message: string;
};

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
    case 'POST':
      return uploadImageUser(req, res);
    default:
      break;
  }
}

const uploadImageUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { base64, fileType, extension, path, name } = req.body;
  const base64Clean = base64.replace('data', '').replace(/^.+,/, '');
  const basecv = Buffer.from(base64Clean, 'base64');
  await db.connect();
  const numOfOrders = await Order.find({ user: session.user._id }).count();
  await db.disconnect();

  const absolutePath = `orders/${session.email.split('@')[0]}-${session.email
    .split('@')[1]
    .replaceAll('.com', '')}/order-${numOfOrders + 1}/${path}`;
  const fileName = name.replaceAll(' ', '-');

  const image = await imageUpload.uploadFilesToStorage(
    basecv,
    absolutePath,
    fileName,
    fileType,
    extension
  );

  return res.status(200).json({ message: image });
};
