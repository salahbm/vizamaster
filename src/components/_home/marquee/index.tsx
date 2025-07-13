'use client';
import SectionHeader from '@/components/shared/SectionHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useMemo } from 'react';
import Marquee from 'react-fast-marquee';

// Custom image loader for static images from public directory
const imageLoader = ({ src }: { src: string }) => {
  return src;
};

const PeopleMarquee = () => {
  const t = useTranslations('PeopleMarquee');

  // Memoize data arrays to prevent unnecessary re-renders
  const data = useMemo(
    () =>
      Array.from({ length: 17 }, (_, index) => ({
        id: index,
        src: `/people/${index + 1}.jpg`,
      })),
    []
  );

  const data_2 = useMemo(
    () =>
      Array.from({ length: 17 }, (_, index) => ({
        id: index,
        src: `/people/${index + 17}.jpg`,
      })),
    []
  );

  return (
    <div className="space-y-4 p-4 mt-16 relative">
      <SectionHeader
        headerInfo={{
          title: t('header.title'),
          subtitle: t('header.subtitle'),
          description: t('header.description'),
        }}
      />

      <Marquee
        autoFill
        pauseOnClick
        className="mt-8"
        speed={100}
        gradientWidth={50}
      >
        {data.map((item) => (
          <div key={item.id} className="relative w-60 h-72 md:w-90 md:h-80 m-2">
            <Image
              loader={imageLoader}
              src={item.src}
              alt={`Team member ${item.id}`}
              fill
              className="rounded-lg shadow-lg object-cover"
              sizes="(max-width: 640px) 60px, (max-width: 1024px) 90px, 90px"
              loading={item.id < 3 ? 'eager' : 'lazy'}
              priority={item.id < 3} // Prioritize first few images
            />
          </div>
        ))}
      </Marquee>
      <Marquee
        direction="right"
        autoFill
        pauseOnClick
        speed={100}
        gradientWidth={50}
      >
        {data_2.map((item) => (
          <div key={item.id} className="relative w-60 h-72 md:w-90 md:h-80 m-2">
            <Image
              loader={imageLoader}
              src={item.src}
              alt={`Team member ${item.id}`}
              fill
              className="rounded-lg shadow-lg object-cover"
              sizes="(max-width: 640px) 60px, (max-width: 1024px) 90px, 90px"
              loading={item.id < 3 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </Marquee>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
    </div>
  );
};

export default PeopleMarquee;
