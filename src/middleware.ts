import { defaultLocale } from './../i18n.config';
import { locales } from '../i18n.config';

import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../auth';

const publicPages = ['/sign-in', '/sign-up'];
const protectedPages = ['/dashboard'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const session = await auth();

  const isProtectedRoute = protectedPages.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  // Redirect to sign-in if trying to access protected route without session
  if (isProtectedRoute && !session) {
    const signInURL = new URL('/sign-in', request.nextUrl.origin);
    return NextResponse.redirect(signInURL.toString());
  }

  // Check if the user is trying to access sign-in or sign-up page
  if (publicPages.some((page) => request.nextUrl.pathname.startsWith(page))) {
    const { email } = session?.user || {};

    // Allow access to sign-in or sign-up only if the email is salahbm.001@gmail.com
    if (email !== 'salahbm.001@gmail.com') {
      const homeURL = new URL('/', request.nextUrl.origin);
      return NextResponse.redirect(homeURL.toString());
    }
  }

  // Exclude specific paths from further processing
  if (
    !publicPages.some((page) => request.nextUrl.pathname.startsWith(page)) &&
    !request.nextUrl.pathname.startsWith('/api') &&
    !request.nextUrl.pathname.startsWith('/_next') &&
    !request.nextUrl.pathname.includes('/(*.)')
  ) {
    return intlMiddleware(request);
  }

  // Return the response object directly
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
