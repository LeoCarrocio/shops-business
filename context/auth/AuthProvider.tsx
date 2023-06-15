import {FC, useReducer,ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import {AuthContext, authReducer} from './';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

interface Props { 
  children: ReactNode
}

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}



const AUTH_INITIAL_STATE : AuthState = {

  isLoggedIn: false,
  user: undefined
}


export const AuthProvider:FC<Props> = ({children}) =>{

  const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

  const { data, status} = useSession(); 

  const router = useRouter();



  useEffect(()=>{  
    if(status === 'authenticated'){
      dispatch({ type:'[Auth] - Login', payload : data.user as IUser })
    }

  },[status, data]); 

// se comenta xq vamos a utilizar el useSeccion de Next, esta aut es propia hecha por nosotros 
  // useEffect(()=>{  
  //   checkToken();

  // },[])



  const checkToken = async () =>{

    if(!Cookie.get('token')){
      return;
    }

    try {
      const { data } = await tesloApi.get('/user/validate-token') // como las cookies viajan por el pedido de axios , no hace falta mandarlos
      const { token, user } = data;
      Cookie.set('token', token);

      dispatch({type:'[Auth] - Login', payload: user})

    } catch (error) {
      Cookie.remove('token');
    }
  }


  const loginUser = async ( email:string, password:string): Promise<boolean> =>{
    
    try {
      const { data } = await tesloApi.post('/user/loguin',{email, password})
      const { token, user } = data;
      Cookie.set('token', token);

      dispatch({type:'[Auth] - Login', payload: user})

      return true;

    } catch (error) {
      return false;
    }
  }

  const registerUser = async (name: string, password: string, email: string): Promise<{hasError: boolean, message?: string}> => {

    try {
      
      const { data } = await tesloApi.post('/user/register',{email, password, name})
      const { token, user } = data;
      Cookie.set('token', token);

      dispatch({type:'[Auth] - Login', payload: user})

      return {
        hasError:false
      }

    } catch (error) {
      
      if(axios.isAxiosError(error)){
        return{
          hasError: true,
          message: error.response?.data.message
        }
      }
      return{
        hasError: true,
        message: 'No se pudo crear el usuario'
      }
    }
  }


  const logout = () =>{

    Cookie.remove('cart');

    Cookie.remove('firstName');
    Cookie.remove('lastName');
    Cookie.remove('address');
    Cookie.remove('address2');
    Cookie.remove('zip');
    Cookie.remove('city');
    Cookie.remove('country');
    Cookie.remove('phone');

    signOut();
    
    // Cookie.remove('token');
    // router.reload(); // refreso la pagina y pierdo mi token y carrito 

  }


  return (
    <AuthContext.Provider value={{
      ...state,
      // METHODS

      loginUser,
      registerUser,
      logout
    
    }
    } >
    {children}
    </AuthContext.Provider>
  ) 


}