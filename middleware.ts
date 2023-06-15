// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET}); // busco el tokens y me fijo q este autenticado, tengo infomacio util del usuario

  if(!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`;

    return NextResponse.redirect(url); 
  }

  return NextResponse.next()
  // return NextResponse.redirect(new URL('/about-2', req.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/address', '/checkout/summary'],
}