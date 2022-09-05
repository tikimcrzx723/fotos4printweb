import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(process.env.SG_API_KEY!);

export const completedOrder = async (to: string, html: string) => {
  try {
    await sendgrid.send({
      to,
      from: 'no-reply@fotos4print.com',
      subject: 'Order Complete',
      text: 'your order is ready',
      html,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
