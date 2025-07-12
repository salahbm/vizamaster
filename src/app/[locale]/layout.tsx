import { BRAND_NAME } from '@/constants/name';
import AppProvider from '@/providers';
import { Params } from '@/types/global';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { poppins } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Loading from './loading';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  const { locales } = routing;
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
    metadataBase: new URL(`https://www.vizamaster.uz`),
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
      images: [
        {
          url: `/og/small.png`,
          width: 600,
          height: 315,
        },
        {
          url: `/og/large.png`,
          width: 1200,
          height: 600,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: BRAND_NAME,
      images: [`/og/twitter.png`],
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
  setRequestLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn(poppins.className)}>
        <AppProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>

          <Toaster />
          <Analytics debug={false} />
        </AppProvider>
      </body>
    </html>
  );
}
