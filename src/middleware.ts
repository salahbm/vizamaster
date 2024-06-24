import { defaultLocale, locales } from '../i18n.config';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const publicPages = ['/sign-in'];
const protectedPages = ['/dashboard'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

// Define auth routes
const authRoutes = ['/sign-in'];

export async function middleware(request: NextRequest) {
  // Check for authentication cookie
  const isLoggedIn = !!request.cookies.get('authjs.session-token');

  // Extract locale from the pathname

  const pathname = request.nextUrl.pathname;
  const locale = pathname.split('/')[1];

  // Check if the request is for an auth route
  const isAuthRoute = authRoutes.includes(
    `/${locale}${pathname.replace(`/${locale}`, '')}`
  );

  const isApiAuthRoute = pathname.startsWith('/api/auth');

  // Allow API auth routes to proceed
  if (isApiAuthRoute) {
    return NextResponse.next();
  }
  // Handle authenticated user on auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.nextUrl)
      );
    }
    return NextResponse.next();
  }

  // Handle unauthenticated user on protected routes
  if (
    !isLoggedIn &&
    protectedPages.includes(pathname.replace(`/${locale}`, ''))
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}/sign-in`, request.nextUrl)
    );
  }

  // Exclude specific paths from further processing
  if (
    !publicPages.some((page) => pathname.startsWith(page)) &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.includes('/favicon.ico')
  ) {
    return intlMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
