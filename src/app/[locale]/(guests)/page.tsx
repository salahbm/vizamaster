import { unstable_setRequestLocale } from 'next-intl/server';
import Home from './home/page';

export default async function GuestIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Home params={{ locale }} />
    </>
  );
}
