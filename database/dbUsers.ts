import { db } from '.';
import { Company, User } from '../models';
import bcryptjs from 'bcryptjs';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) return null;
  if (!bcryptjs.compareSync(password, user.password!)) return null;

  const { role, name, _id } = user;
  return {
    _id,
    email: email.toLocaleLowerCase(),
    role,
    name,
  };
};

// check user from OAuth
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  const defaultPassword = process.env.DEFAULT_NEW_PASSWORD || '@';

  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;
    return { _id, name, email, role };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: bcryptjs.hashSync(defaultPassword),
    role: 'client',
  });
  await newUser.save();
  await db.disconnect();

  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};

export const findAddress = async (userId: string) => {
  await db.connect();
  const user = await User.findById(userId).populate('address').lean();

  await db.disconnect();

  if (user?.address !== null && user?.address !== undefined)
    return JSON.parse(JSON.stringify(user?.address));
  else return null;
};

export const findCompany = async () => {
  await db.connect();
  const company = await Company.find().lean();
  await db.disconnect();

  if (company.length === 0) return null;
  else return JSON.parse(JSON.stringify(company[0]));
};
