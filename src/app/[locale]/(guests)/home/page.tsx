import { Brands } from '@/components/_home/brands';
import Feature from '@/components/_home/Features';
import FunFact from '@/components/_home/FunFact';
import { Process } from '@/components/_home/process';
import { useTranslations } from 'next-intl';
import React from 'react';

const Home = () => {
  const t = useTranslations();
  return (
    <div>
      <h1 className=" font-italic text-green-700"> {t('Home.title')}</h1>
      <Feature />
      <Process />
      <Brands />
      <FunFact />
    </div>
  );
};

export default Home;
