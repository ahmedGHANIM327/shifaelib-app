import { auth } from '@/auth';

const authURLS = ['/login', '/request-reset-password', '/reset-password'];

export default auth((req) => {
  if (!req.auth && !authURLS.includes(req.nextUrl.pathname)) {
    const newUrl = new URL('/login', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && authURLS.includes(req.nextUrl.pathname)) {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
