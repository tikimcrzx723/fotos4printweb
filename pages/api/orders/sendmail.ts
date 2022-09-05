import type { NextApiRequest, NextApiResponse } from 'next';
import { orderManager } from '../../../mail';
import sendgrid from '@sendgrid/mail';
import { getToken } from 'next-auth/jwt';
sendgrid.setApiKey(process.env.SG_API_KEY!);

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return sentMailOrder(req, res);
    default:
      break;
  }
}

const sentMailOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { orderItems = [], orderId = '', total = 0 } = req.body;
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const email = session.user.email;
  const fullName = session.user.name;

  const html = orderManager.completeOrder(
    'https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/fcbdd3a228648ac062e4977b0eda8c76.png',
    orderId,
    orderItems,
    email,
    fullName,
    total
  );

  console.log(html);
  console.log(session);

  try {
    await sendgrid.send({
      to: email, // Your email where you'll receive emails
      from: 'no-reply@fotos4print.com', // your website email address here
      subject: `Order Recip`,
      text: 'No a invoice',
      html,
    });
    return res.status(200).json({ message: 'Send mail recover Ok :)' });
  } catch (error) {
    return res.status(200).json({ message: 'Send mail Bad' });
  }
};
