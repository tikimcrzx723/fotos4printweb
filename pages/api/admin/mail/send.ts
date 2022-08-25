import type { NextApiRequest, NextApiResponse } from 'next';

import sgMail from '@sendgrid/mail';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await sgMail.setApiKey(
    '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'
  );

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
