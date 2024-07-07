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

// Can be imported from a shared config
const locales = ['en', 'ru', 'uz'];

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
    metadataBase: new URL(`https://bsgroup.vercel.app/en`),
    // alternates: {
    // 	canonical: `/${locale}`,
    // 	languages: {
    // 		en: '/en',
    // 	},
    // },
    // openGraph: {
    //   title,
    //   description,
    //   url: `/`,
    //   siteName: BRAND_NAME,
    //   images: [
    //     {
    //       url: `/og/small.png`,
    //       width: 600,
    //       height: 315,
    //     },
    //     {
    //       url: `/og/large.png`,
    //       width: 1200,
    //       height: 600,
    //     },
    //   ],
    //   type: 'website',
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title,
    //   description,
    //   site: BRAND_NAME,
    //   images: [`/og/twitter.png`],
    // },
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
        </AppProvider>
      </body>
    </html>
  );
}
