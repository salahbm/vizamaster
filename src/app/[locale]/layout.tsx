import Header from '@/components/shared/header';
import { BRAND_NAME } from '@/constants/name';
import AppProvider from '@/providers';
import { Params } from '@/types/global';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import '../../styles/globals.css';
import Footer from '@/components/shared/footer';
import { poppins } from '@/styles/fonts';
import { cn } from '@/lib/utils';

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
    metadataBase: new URL(`http://localhost:3000`),
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
  return (
    <html lang={locale}>
      <body className={cn('max-w-screen-xl mx-auto', poppins.className)}>
        <AppProvider>
          <Header />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
