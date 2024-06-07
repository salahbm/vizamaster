import { dir } from 'i18next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import React, { PropsWithChildren } from 'react';

import { BRAND_NAME } from '@/constants/name';
import initTranslations from '../i18n';
import { Params } from '@/types/global';
import i18nConfig from '../../../i18n.config';
import { grotesk, roboto, robotoMono } from '@/styles/fonts';
import AppProvider from '@/providers';

export async function generateMetadata({
  params: { locale },
}: Params): Promise<Metadata> {
  const { t } = await initTranslations(locale);
  const title = t('Meta.home.title', { brand: BRAND_NAME });
  const description = t('Meta.home.description', { brand: BRAND_NAME });

  return {
    title,
    description,
    keywords: t('Meta.keywords'),
    metadataBase: new URL(`http://localhost:3000/`),
    // alternates: {
    // 	canonical: `/${locale}`,
    // 	languages: {
    // 		en: '/en',
    // 	},
    // },
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale: any) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: PropsWithChildren<Params>) {
  if (!i18nConfig.locales.includes(locale)) notFound();

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={dir(locale)}
      className={`${roboto.variable} ${robotoMono.variable} ${grotesk.variable}`}
    >
      <body>
        <AppProvider locale={locale}>{children}</AppProvider>
      </body>
    </html>
  );
}
