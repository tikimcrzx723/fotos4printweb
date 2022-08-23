import type { NextApiRequest, NextApiResponse } from 'next';
import { Credentials, S3 } from 'aws-sdk';

export const config = {
  api: {
    responseLimit: '1024mb',
  },
};

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
    case 'POST':
      return DownloadFile(req, res);

    default:
      break;
  }
}

const DownloadFile = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { url } = req.body;
  console.log(url);

  res.setHeader('Content-Type', 'image/jpeg');
  res.setHeader('Content-Type', 'image/jpg');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Type', 'pdf');

  const imageChar = url.split('/');
  const image = imageChar[imageChar.length - 1];
  const urlClean = url
    .replaceAll('us-southeast-1.linodeobjects.com/fotos4printmedia/', '')
    .replaceAll('https://', '')
    .replaceAll('http://', '')
    .replaceAll('fotos4printmedia.us-southeast-1.linodeobjects.com/', '')
    .replaceAll('us-southeast-1.linodeobjects.com/', '');
  console.log(urlClean);

  res.setHeader('Content-Disposition', `attachment; filename=${image}`);

  const options = {
    Bucket: process.env.LINODE_OBJECT_BUCKET!,
    Key: urlClean,
  };

  const fileStream = s3Client.getObject(options).createReadStream();

  return res.send(fileStream as any);
};
