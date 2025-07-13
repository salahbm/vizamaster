import { BRAND_NAME } from '@/constants/name';
import HeroBanner from './hero-banner';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import React from 'react';

const Hero = React.memo(() => {
  const t = useTranslations('Hero');

  return (
    <section
      className="relative flex items-center justify-center lg:flex-row flex-col lg:justify-between pt-30 lg:w-screen lg:-translate-x-[50%] lg:ml-[50%]"
      aria-labelledby="hero-heading"
    >
      {/* Background pattern and gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#4b3a6b,transparent)]"></div>
      </div>

      {/* Hero content container */}
      <div className="animate-fade-in-scale max-w-screen-xl px-4 py-8 sm:px-6 mx-auto lg:gap-12 xl:gap-0 lg:py-16 lg:flex-row flex flex-col items-center justify-between w-full">
        {/* Text content */}
        <div className="mr-auto place-self-center lg:col-span-7 max-w-2xl">
          <h1
            id="hero-heading"
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black dark:text-white"
          >
            <span className="textGradient">{t('title')}</span>
          </h1>
          <p className="mb-6 font-light text-gray-600 dark:text-gray-300 lg:mb-8 md:text-lg lg:text-xl">
            {t('description', { BRAND_NAME })}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:flex-row">
            <Link href="/jobs" passHref>
              <Button
                className="bg-gradient-to-br from-purple-600 to-orange-600 hover:bg-gradient-to-bl text-white font-medium px-6 py-2.5"
                aria-label={t('getStarted')}
              >
                {t('getStarted')}
              </Button>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 md:text-lg">
              {t('secureSpot')}
            </p>
          </div>
        </div>

        {/* Hero banner images */}
        <div className="mt-8 lg:mt-0 w-full max-w-md lg:max-w-lg">
          <HeroBanner />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
