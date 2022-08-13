import type { NextApiRequest, NextApiResponse } from 'next';
import { Credentials, S3 } from 'aws-sdk';

const s3Client = new S3({
  region: process.env.LINODE_OBJECT_STORAGE_REGION,
  endpoint: process.env.LINODE_OBJECT_STORAGE_ENDPOINT,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: new Credentials({
    accessKeyId: process.env.LINODE_OBJECT_STORAGE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.LINODE_OBJECT_STORAGE_SECRET_ACCESS_KEY!,
  }),
});

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return DownloadFile(req, res);

    default:
      break;
  }
}

const DownloadFile = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { url } = req.query;

  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Content-Type', 'image/jpg');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Type', 'pdf');

  const arrayChars = url.toString().split('+');
  const downloadAs = arrayChars[arrayChars.length - 1];
  const image = url.toString().replaceAll('+', '/');

  res.setHeader('Content-Disposition', `attachment; filename=${downloadAs}`);

  const options = {
    Bucket: process.env.LINODE_OBJECT_BUCKET!,
    Key: image,
  };

  const fileStream = s3Client.getObject(options).createReadStream();

  return res.send(fileStream as any);
};
