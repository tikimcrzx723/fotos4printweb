import Twilio from 'twilio';

export const sendOrderMessage = async (phone: string, msg: string) => {
  const client = Twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );
  const message = await client.messages.create({
    body: msg,
    from: '+15039070187',
    to: phone,
  });
};
