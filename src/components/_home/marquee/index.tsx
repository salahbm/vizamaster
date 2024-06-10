import SectionHeader from '@/components/shared/SectionHeader';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const data = [
  { id: 0, src: '/people/person.jpeg' },
  { id: 1, src: '/people/person_1.jpeg' },
  { id: 2, src: '/people/person_2.jpeg' },
];

const PeopleMarquee = () => {
  return (
    <div className="space-y-4 p-4 mt-16">
      <SectionHeader
        headerInfo={{
          title: 'OUR CANDIDATES',
          subtitle: 'Happy Clients',
          description: `We are proud of our team. Here are some of our happy clients.`,
        }}
      />
      <Marquee autoFill pauseOnHover className="mt-8">
        {data.map((item) => (
          <div key={item.id} className="relative w-36 h-36 md:w-48 md:h-48 m-2">
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
      <Marquee direction="right" autoFill pauseOnHover>
        {data.map((item) => (
          <div key={item.id} className="relative w-36 h-36 md:w-48 md:h-48 m-2">
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
      <Marquee autoFill pauseOnHover>
        {data.map((item) => (
          <div key={item.id} className="relative w-36 h-36 md:w-48 md:h-48 m-2">
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
    </div>
  );
};

export default PeopleMarquee;
