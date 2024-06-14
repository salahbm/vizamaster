import { BRAND_NAME } from '@/constants/name';
import { Params } from '@/types/global';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import Loader from '@/components/shared/loader';
import Sidebar from './_components/sidebar';
import Header from './_components/header';
import { SessionProvider } from 'next-auth/react';

export async function generateMetadata({
  params: { locale },
}: Params): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const description = t('home.description', { brand: BRAND_NAME });

  return {
    title: `Admin | ${BRAND_NAME}`,
    description,
    metadataBase: new URL(`http://localhost:3000`),
  };
}

export default function AdminLayout({
  children,
}: React.PropsWithChildren<Params>) {
  return (
    <SessionProvider>
      <Suspense fallback={<Loader />}>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-hidden pt-16">{children}</main>
        </div>
      </Suspense>
    </SessionProvider>
  );
}
