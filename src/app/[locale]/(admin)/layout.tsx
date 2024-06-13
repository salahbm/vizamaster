import { BRAND_NAME } from '@/constants/name';
import { Params } from '@/types/global';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import Loader from '@/components/shared/loader';
import AdminProvider from '@/providers/admin-root-provider';
import { SignIn } from '@clerk/nextjs';

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
    <div>
      <Suspense fallback={<Loader />}>
        {/* <SignIn> */}

        {/* <AdminProvider> */}
        {children}
        {/* </AdminProvider> */}
        {/* </SignIn> */}
      </Suspense>
    </div>
  );
}
