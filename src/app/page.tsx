'use client';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <main className="flex min-h-screen flex-col pb-[17.5rem] pt-header mobile:pb-[6rem]">
      {t('Home.title')}
    </main>
  );
};

export default Home;
