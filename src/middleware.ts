import { defaultLocale, locales } from '../i18n.config';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const publicPages = ['/sign-in', '/sign-up'];
const protectedPages = ['/dashboard'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
});

// Define auth routes
const authRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const isLoggedIn = !!request.cookies.get('next-auth.session-token');
  const locale = request.nextUrl.pathname.split('/')[1];
  const isAuthRoute = authRoutes.includes(
    `/${locale}${request.nextUrl.pathname}`
  );
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.nextUrl)
      );
    }
    return NextResponse.next();
  }

  if (
    !isLoggedIn &&
    protectedPages.includes(request.nextUrl.pathname.replace(`/${locale}`, ''))
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}/sign-in`, request.nextUrl)
    );
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
