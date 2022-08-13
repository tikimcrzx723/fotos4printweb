import bcryptjs from 'bcryptjs';

interface SeedUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'client' | 'federal' | 'frequent';
}

interface SeedData {
  users: SeedUser[];
}

const password00 = bcryptjs.hashSync('Tikio123.es$');
const password01 = bcryptjs.hashSync('Tikio123.es$');
const password02 = bcryptjs.hashSync('Tikio123.es$');
const password03 = bcryptjs.hashSync('Tikio123.es$');

export const initialData: SeedData = {
  users: [
    {
      name: 'Le Portrait de Petit Cossette',
      email: 'cossette@gmail.com',
      password: password00,
      role: 'admin',
    },
    {
      name: 'Eutiquio Javier',
      email: 'tikimioo@gmail.com',
      password: password01,
      role: 'client',
    },
    {
      name: 'Salomen Delgado',
      email: 'salomen@gmail.com',
      password: password02,
      role: 'federal',
    },
    {
      name: 'Delfino Urgado',
      email: 'delfino@hotmail.com',
      password: password03,
      role: 'frequent',
    },
  ],
};
