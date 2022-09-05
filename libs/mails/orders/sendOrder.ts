import { orderManager } from '../../../mail';
import sendgrid from '@sendgrid/mail';
import { IOrderItem } from '../../../interfaces';
sendgrid.setApiKey(process.env.SG_API_KEY!);

export const sendOrder = async (
  to: string,
  from: string,
  subject: string,
  text: string,
  orderId: string,
  orderItems: IOrderItem[],
  fullName: string,
  total: number
) => {
  const html = orderManager.completeOrder(
    'https://www.fotos4print.com/logogood.png',
    orderItems,
    orderId,
    to,
    fullName,
    total
  );

  try {
    await sendgrid.send({
      to, // Your email where you'll receive emails
      from, // your website email address here
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
