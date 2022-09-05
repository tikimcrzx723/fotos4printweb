import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { User, Recover } from '../../../../models';
import bcryptjs from 'bcryptjs';
import { sendRecoverPassword } from '../../../../libs/mails';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return recoverPassword(req, res);
    default:
      break;
  }
}

const recoverPassword = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email } = req.body;

  await db.connect();

  const user = await User.findOne({ email });
  if (user === null) {
    await db.disconnect();
    return res.status(404).json({ message: 'User not found!' });
  }

  const tempPassword = randomUUID();
  let id: any = '';

  const existRecover = await Recover.findOne({ user: user._id });

  if (existRecover) {
    existRecover.tempPassword = bcryptjs.hashSync(tempPassword);
    existRecover.numberOfAttempts = existRecover.numberOfAttempts + 1;
    existRecover.requestedDay = Date.now();
    existRecover.changePassword = false;
    id = existRecover._id;
    await existRecover.save();
    await db.disconnect();
  } else {
    const recover = new Recover({
      user: user?._id,
      numberOfAttempts: 1,
      tempPassword: bcryptjs.hashSync(tempPassword),
      requestedDay: Date.now(),
      changePassword: false,
    });

    await recover.save();
    id = recover._id;
    await await db.disconnect();
  }
  const setURLPassword = await sendRecoverPassword(email, id, tempPassword);
  if (setURLPassword) {
    return res.status(200).json({ message: 'Sent Recover Password Ok' });
  }
  return res.status(200).json({ message: 'Sent Recover Password Is To Bad' });
};
