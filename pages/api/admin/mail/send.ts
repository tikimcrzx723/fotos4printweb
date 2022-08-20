import type { NextApiRequest, NextApiResponse } from 'next';

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SG_API_KEY!);

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email, message } = req.body;

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL_SERVICE!,
    subject: 'Fotos4Print Data',
    html: `<p><strong>Name: </strong>${name}</p>
    <p><strong>Email: </strong>${email}</p>
    <p><strong>Message: </strong>${message}</p>`,
  };

  await sgMail.send(msg);
}
