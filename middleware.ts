import { auth } from '@/auth';

const publicURLS = ['/login', '/request-reset-password', '/reset-password'];

const ownerURLS = ['/cabinet','/cabinet/users', '/cabinet/services'];

export default auth((req) => {
  if (publicURLS.includes(req.nextUrl.pathname) ) {
    if(req.auth) {
      const newUrl = new URL('/', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  } else {
    if(!req.auth) {
      const newUrl = new URL('/login', req.nextUrl.origin);
      return Response.redirect(newUrl);
    } else {
      if(ownerURLS.includes(req.nextUrl.pathname) && !req.auth.user.isOwner) {
        const newUrl = new URL('/unauthorized', req.nextUrl.origin);
        return Response.redirect(newUrl);
      }
    }
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
