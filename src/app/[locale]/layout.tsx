import { BRAND_NAME } from '@/constants/name';
import AppProvider from '@/providers';
import { Params } from '@/types/global';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { poppins } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Loading from './loading';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';
import { locales } from '../../../i18n.config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Params): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const title = t('home.title', { brand: BRAND_NAME });
  const description = t('home.description', { brand: BRAND_NAME });

  return {
    title,
    description,
    metadataBase: new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'
    ),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `/`,
      siteName: BRAND_NAME,
      type: 'website',
    },
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'max-w-screen-xl mx-auto overflow-x-hidden',
          poppins.className
        )}
      >
        <AppProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>

          <Toaster />
          <Analytics debug={false} />
        </AppProvider>
      </body>
    </html>
  );
}
