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

  if (isProtectedRoute && !session) {
    const signInURL = new URL('/sign-in', request.nextUrl.origin);
    return NextResponse.redirect(signInURL.toString());
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
  // Match only internationalized pathnames
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
