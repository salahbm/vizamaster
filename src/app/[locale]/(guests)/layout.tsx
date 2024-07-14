import Header from '@/components/shared/header';
import { Params } from '@/types/global';
import Footer from '@/components/shared/footer';
import { PropsWithChildren } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';

export default function GuestLayout({
  children,
  params,
}: PropsWithChildren<Params>) {
  unstable_setRequestLocale(params.locale);
  return (
    <div>
      <NextTopLoader color="#ff6947" height={4} />
      <Header />

      {children}
      <Footer />
    </div>
  );
}
