import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "../../utils";

// esta funcion middleware se ejecuta antes de las paginas q estas a mismo nivel, osea /addres y /summary

export async function middleware( req: NextRequest, ev:NextFetchEvent){

  const { token = ''} = req.cookies;

  try {
    
     await jwt.isValidToken( token);
    return NextResponse.next();  

  } catch (error) {

    const requestedPage = req.page.name; 
    return NextResponse.redirect(`/auth/login?p=${requestedPage}`)
    
  }


}