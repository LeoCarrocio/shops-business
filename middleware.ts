// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

 // busco el tokens y me fijo q este autenticado, tengo infomacio util del usuario
  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if(!session) {

    if (req.nextUrl.pathname.startsWith('/api/admin')) {
      return NextResponse.redirect('/api/noAutorizado');
    }


    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();

    url.pathname = '/auth/login';
    url.search = `p=${requestedPage}`; // Si no encuentra la seccion , lo manda a loguear y luego prosigue a donde tiene q ir

    return NextResponse.redirect(url);  
  }

  const validRoles = ['admin','super-user','SEO'];
  if (req.nextUrl.pathname.startsWith('/admin')) {

    if ( !validRoles.includes( session.user.role ) ) {
      return NextResponse.redirect('/');
    }
  return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect('/api/noAutorizado');
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
 
export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};