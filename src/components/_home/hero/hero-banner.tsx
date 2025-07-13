'use client';

import React from 'react';
import ImageFrame from './image-frame';
import { motion } from 'framer-motion';

type ImageType = 'square' | 'rectangle';

interface JobImage {
  id: string;
  url: string;
  type: ImageType;
  alt: string;
}

const images: JobImage[] = [
  {
    id: 'welder',
    url: '/images/welder.jpeg',
    type: 'square',
    alt: 'Welder at work',
  },
  {
    id: 'worker',
    url: '/images/worker.jpeg',
    type: 'rectangle',
    alt: 'Construction worker',
  },
  {
    id: 'cook',
    url: '/images/cook.jpeg',
    type: 'rectangle',
    alt: 'Professional cook',
  },
  {
    id: 'cleaner',
    url: '/images/cleaner.jpeg',
    type: 'square',
    alt: 'Cleaning professional',
  },
  {
    id: 'remont',
    url: '/images/remont.jpeg',
    type: 'rectangle',
    alt: 'Renovation specialist',
  },
];

const HeroBanner = React.memo(() => {
  // Container animation for the entire grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.35,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full"
      aria-label="Career opportunities showcase"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        <ImageFrame
          imgUrl={images[0].url}
          type={images[0].type}
          alt={images[0].alt}
          index={0}
        />
        <ImageFrame
          imgUrl={images[1].url}
          type={images[1].type}
          alt={images[1].alt}
          index={1}
        />
      </div>
      <div className="flex flex-col gap-2 sm:gap-3">
        <ImageFrame
          imgUrl={images[2].url}
          type={images[2].type}
          alt={images[2].alt}
          index={2}
        />
        <ImageFrame
          imgUrl={images[3].url}
          type={images[3].type}
          alt={images[3].alt}
          index={3}
        />
      </div>
      <div className="hidden md:flex flex-col justify-center">
        <ImageFrame
          imgUrl={images[4].url}
          type={images[4].type}
          alt={images[4].alt}
          index={4}
        />
      </div>
    </motion.div>
  );
});

HeroBanner.displayName = 'HeroBanner';

export default HeroBanner;
