import SectionHeader from '@/components/shared/SectionHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const data = [
  { id: 0, src: '/people/person.jpeg' },
  { id: 1, src: '/people/person_1.jpeg' },
  { id: 2, src: '/people/person_2.jpg' },
  { id: 3, src: '/people/person_3.jpg' },
  { id: 4, src: '/people/person_4.jpg' },
  { id: 5, src: '/people/person_5.jpg' },
  { id: 6, src: '/people/person_6.jpg' },
  { id: 7, src: '/people/person_7.jpg' },
  { id: 8, src: '/people/person_8.jpg' },
  { id: 9, src: '/people/person_9.jpg' },
];

const data_2 = [
  { id: 10, src: '/people/person_10.jpg' },
  { id: 0, src: '/people/person_11.jpg' },
  { id: 1, src: '/people/person_12.jpg' },
  { id: 2, src: '/people/person_13.jpg' },
  { id: 3, src: '/people/person_14.jpg' },
  { id: 4, src: '/people/person_15.jpg' },
  { id: 5, src: '/people/person_16.jpg' },
  { id: 6, src: '/people/person_17.jpg' },
  { id: 7, src: '/people/person_18.jpg' },
];

const PeopleMarquee = () => {
  const t = useTranslations('PeopleMarquee');
  return (
    <div className="space-y-4 p-4 mt-16 relative">
      <SectionHeader
        headerInfo={{
          title: t('header.title'),
          subtitle: t('header.subtitle'),
          description: t('header.description'),
        }}
      />

      <Marquee autoFill pauseOnClick className="mt-8">
        {data.map((item) => (
          <div key={item.id} className="relative w-60 h-50 md:w-90 md:h-60 m-2">
            <Image
              src={item.src}
              alt="image"
              fill
              className="rounded-lg shadow-lg object-cover"
              sizes="(100vw, 100vh)"
            />
          </div>
        ))}
      </Marquee>
      <Marquee direction="right" autoFill pauseOnClick>
        {data_2.map((item) => (
          <div key={item.id} className="relative w-60 h-50 md:w-90 md:h-60 m-2">
            <Image
              src={item.src}
              alt="image"
              fill
              className="rounded-lg shadow-lg object-cover"
              sizes="(100vw, 100vh)"
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
