import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(process.env.SG_API_KEY!);

export const sendRecoverPassword = async (
  email: string,
  id: string,
  tempPassword: string
) => {
  try {
    await sendgrid.send({
      to: email, // Your email where you'll receive emails
      from: 'no-reply@fotos4print.com', // your website email address here
      subject: `Recover Password`,
      html: `<p>
          please change your password this link: <a href="${process.env.NEXTAUTH_URL}/perfil/password/recover/${id}?tempPassword=${tempPassword}">
          Recover Password</a>
          </p>`,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
