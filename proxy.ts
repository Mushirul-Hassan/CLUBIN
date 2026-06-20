// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const PUBLIC_ROUTES = ['/login'];

// export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (PUBLIC_ROUTES.includes(pathname)) {
//     return NextResponse.next();
//   }

//   const refreshCookie = request.cookies.get('jwt_refresh');

//   if (!refreshCookie) {
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('from', pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|login).*)',
//   ],
// };


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const refreshCookie = request.cookies.get('jwt_refresh')

  // Already logged in + trying to visit login → go to dashboard
  if (pathname === '/login' && refreshCookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Not logged in + trying to visit protected route → go to login
  if (pathname !== '/login' && !refreshCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}