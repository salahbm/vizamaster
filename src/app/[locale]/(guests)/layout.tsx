import Header from '@/components/shared/header';
import { Params } from '@/types/global';
import Footer from '@/components/shared/footer';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren<Params>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
