import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations();
  return <h1 className="text-3xl font-italic"> {t('Home.title')}</h1>;
}
