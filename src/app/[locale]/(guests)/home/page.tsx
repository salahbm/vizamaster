import { useTranslations } from 'next-intl';
import React from 'react';

const Home = () => {
  const t = useTranslations();
  return (
    <div>
      <h1 className=" font-italic text-green-100"> {t('Home.title')}</h1>
    </div>
  );
};

export default Home;
