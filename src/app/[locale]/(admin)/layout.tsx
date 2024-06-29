import { BRAND_NAME } from '@/constants/name';
import { Params } from '@/types/global';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import Loader from '@/components/shared/loader';
import Sidebar from './_components/sidebar';
import Header from './_components/header';
import { SessionProvider } from 'next-auth/react';
import { handleAdmin } from '@/hooks/admin/fetchAdmin';
import NoAdminPage from './_components/no-admin';

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

export default async function AdminLayout({
  children,
}: React.PropsWithChildren<Params>) {
  const isAdmin = await handleAdmin();
  return (
    <main className="relative max-w-screen-[1440px] mx-auto">
      <SessionProvider>
        <Suspense fallback={<Loader />}>
          {isAdmin ? (
            <div className="relative">
              <Header />
              <div className="flex  overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-hidden pt-16">{children}</main>
              </div>
              <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            </div>
          ) : (
            <>
              <NoAdminPage />
            </>
          )}
        </Suspense>
      </SessionProvider>
    </main>
  );
}
