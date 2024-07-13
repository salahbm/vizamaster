'use client';
import PeopleMarquee from '@/components/_home/marquee';
import SectionHeader from '@/components/shared/SectionHeader';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

const images: string[] = [
  '/results/result.jpeg',
  '/results/result_1.jpeg',
  '/results/result_2.jpeg',
  '/results/result_3.jpeg',
  '/results/result_4.jpeg',
  '/results/result_5.jpeg',
  '/results/result_6.jpeg',
  '/results/result_7.jpeg',
  '/results/result_8.jpeg',
  '/results/result_9.jpeg',
  '/results/result_10.jpeg',
  '/results/result_11.jpeg',
  '/results/result_12.jpeg',
  '/results/result_13.jpeg',
  '/results/result_14.jpeg',
  '/results/result_15.jpeg',
  '/results/result_16.jpeg',
  '/results/result_17.jpeg',
  // add more image paths as needed
];

const Results: React.FC = () => {
  const [mainImage, setMainImage] = useState<string>(images[0]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Results');
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="my-35 px-4 relative">
      <SectionHeader
        headerInfo={{
          subtitle: t('header.subtitle'),
          description: t('header.description'),
        }}
      />
      <div className="">
        <div className="mb-4 flex justify-center h-[350px]">
          <Image
            src={mainImage}
            alt="Main"
            className="object-contain rounded-lg shadow-lg border-2 border-secondary "
            width={500}
            height={350}
          />
        </div>
        <div className="relative">
          <button
            className="absolute left-0 z-10 h-32 top-4 rounded-s-lg px-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
            onClick={scrollLeft}
          >
            &lt;
          </button>
          <div
            className="flex overflow-x-auto space-x-4 py-4"
            ref={carouselRef}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-40 h-32 flex-shrink-0 cursor-pointer"
                onClick={() => setMainImage(image)}
              >
                <Image
                  src={image}
                  height={80}
                  width={120}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border-2 border-transparent hover:border-primary transition duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
          <button
            className="absolute right-0 rounded-e-lg top-4 h-32 z-10 px-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
            onClick={scrollRight}
          >
            &gt;
          </button>
        </div>
      </div>
      <PeopleMarquee />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
    </div>
  );
};

export default Results;
