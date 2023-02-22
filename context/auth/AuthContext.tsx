import { createContext } from 'react';
import { IUser } from '../../interfaces';


interface contextProps {
  isLoggedIn: boolean;
  user?: IUser

  loginUser: (email: string, password: string) => Promise<boolean>
  registerUser: (name: string, password: string, email: string) => Promise<{ hasError: boolean; message?: string; }>
}


export const AuthContext = createContext({} as contextProps); 