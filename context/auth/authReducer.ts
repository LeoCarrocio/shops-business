import { IUser } from "../../interfaces";
import { AuthState } from "./AuthProvider";


type AuthActionType =
  | { type : '[Auth] - Login', payload : IUser }
  | { type : '[Auth] - Logout'}


  export const authReducer = ( state: AuthState, action: AuthActionType) =>{

    switch (action.type){

      case'[Auth] - Login':
        return{
          ...state,
          isLogin: true,
          user: action.payload
        }

      case "[Auth] - Logout":
        return {
          ...state,
          isLogin: false,
          user:undefined
        }
    
        default:
          return state;

    }
  }