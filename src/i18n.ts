import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import {
  createNavigation,
  createSharedPathnamesNavigation,
} from 'next-intl/navigation';

// Can be imported from a shared config
const locales = ['en', 'ru', 'uz'];

export const { Link, useRouter, usePathname, redirect } = createNavigation({
  locales,
});

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
