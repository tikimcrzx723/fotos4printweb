import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

import { ICompany, IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import { appApi } from '../../api';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {}

export const AuthProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: '[Auth] - Login', payload: data?.user as IUser });
    }
  }, [status, data]);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await appApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);

      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await appApi.post('/user/register', {
        email,
        password,
        name,
      });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;
        return {
          hasError: true,
          message: err.message,
        };
      }

      return {
        hasError: true,
        message: 'Could not create user - try again',
      };
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('cart');
    signOut();
  };

  const createCompany = async (company: ICompany) => {
    const { data } = await appApi.post<ICompany>('/admin/company', company);
  };

  const updateCompany = async (company: ICompany) => {
    const { data } = await appApi.put<ICompany>('/admin/company', company);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        registerUser,
        logout,
        createCompany,
        updateCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
