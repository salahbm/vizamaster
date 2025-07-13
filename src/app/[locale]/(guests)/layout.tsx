import Header from '@/components/shared/header';
import { Params } from '@/types/global';
import Footer from '@/components/shared/footer';
import { PropsWithChildren } from 'react';
import { setRequestLocale } from 'next-intl/server';

export default function GuestLayout({
  children,
  params,
}: PropsWithChildren<Params>) {
  setRequestLocale(params.locale);
  return (
    <div className="layout-container">
      <Header />

      {children}
      <Footer />
    </div>
  );
}
