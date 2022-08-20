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
  console.log(sgMail);

  const {
    name = 'udemy',
    email = 'tikimcrzx723@gmail.com',
    message = 'Hola Pro',
  } = req.body;

  const msg = {
    to: 'test@example.com',
    from: 'tikimcrzx723@gmail.com', // Use the email address or domain you verified above
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  await sgMail.send(msg);
  return res.status(200).json({ message: 'ok' });
}
