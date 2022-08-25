import sgMail from '@sendgrid/mail';

export const initialEmail = async (
  to: string,
  from: string,
  subject: string,
  text: string,
  html: string
) => {
  await sgMail.setApiKey(process.env.SG_API_KEY!);
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };

  const response = await sgMail.send(msg);

  console.log(response);
  return true;
};
