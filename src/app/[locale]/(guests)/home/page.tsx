import { Brands } from '@/components/_home/brands';
import Feature from '@/components/_home/Features';
import FunFact from '@/components/_home/FunFact';
import PeopleMarquee from '@/components/_home/marquee';
import { Process } from '@/components/_home/process';
import Blog from '@/components/Blog';
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
      <PeopleMarquee />
      <FunFact />
      <Blog />
    </div>
  );
};

export default Home;
