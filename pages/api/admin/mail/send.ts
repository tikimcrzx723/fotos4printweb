import type { NextApiRequest, NextApiResponse } from 'next';

import sgMail from '@sendgrid/mail';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await sgMail.setApiKey(process.env.SG_API_KEY!);

  const msg = {
    to: 'tikimcrzx723@gmail.com',
    from: 'no-reply@fotos4print.com', // Use the email address or domain you verified above
    subject: 'Fotos4Print',
    text: 'Paga Wey',
    html: '<strong>Ya paga</strong>',
  };

  await sgMail.send(msg);
  return res.status(200).json({ message: 'ok' });
}
