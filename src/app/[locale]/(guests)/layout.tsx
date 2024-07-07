import Header from '@/components/shared/header';
import { Params } from '@/types/global';
import Footer from '@/components/shared/footer';
import { PropsWithChildren } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function GuestLayout({
  children,
  params,
}: PropsWithChildren<Params>) {
  unstable_setRequestLocale(params.locale);
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
