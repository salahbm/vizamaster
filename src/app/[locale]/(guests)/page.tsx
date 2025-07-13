import Home from './home/page';
import { setRequestLocale } from 'next-intl/server';

export default async function GuestIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return (
    <>
      <Home params={{ locale }} />
    </>
  );
}
