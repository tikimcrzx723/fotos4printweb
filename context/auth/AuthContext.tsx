import { createContext } from 'react';
import { ICompany, IUser } from '../../interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  // Methods
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  logout: () => void;
  createCompany: (company: ICompany) => void;
  updateCompany: (company: ICompany) => void;
  changePassword: (newPassword: string, userId: string) => void;
}

export const AuthContext = createContext({} as ContextProps);
