import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { defaultLocale, locales } from '../i18n.config';

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
});

const isProtectedRoute = createRouteMatcher(['/dashboard']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  // Apply the internationalization middleware
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
