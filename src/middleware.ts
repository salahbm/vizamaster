import { defaultLocale, locales } from '../i18n.config';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../auth';

const publicPages = ['/sign-in', '/sign-up'];
const protectedPages = ['/dashboard'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

// Define auth routes
const authRoutes = ['/sing-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const isLoggedIn = !!request.cookies.get('next-auth.session-token');
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }
    return NextResponse.next();
  }

  // if (!isLoggedIn && !publicPages.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(
  //     new URL(`/${defaultLocale}/sign-in`, request.nextUrl)
  //   );
  // }

  // Exclude specific paths from further processing
  if (
    !publicPages.some((page) => request.nextUrl.pathname.startsWith(page)) &&
    !request.nextUrl.pathname.startsWith('/api') &&
    !request.nextUrl.pathname.startsWith('/_next') &&
    !request.nextUrl.pathname.includes('/(*.)')
  ) {
    return intlMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
