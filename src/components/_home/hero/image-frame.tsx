'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageFrameProps {
  imgUrl: string;
  type: 'square' | 'rectangle';
  alt: string;
  index?: number;
}

const ImageFrame = React.memo(
  ({ imgUrl, type, alt, index = 0 }: ImageFrameProps) => {
    // Animation variants
    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.25, // Staggered delay based on index
          ease: 'easeOut',
        },
      },
    };

    const imageVariants = {
      hover: {
        scale: 1.05,
        transition: { duration: 0.5 },
      },
    };

    return (
      <motion.div
        className={cn(
          'flex items-center justify-center w-full rounded-xl overflow-hidden',
          type === 'square' ? 'h-[200px]' : 'h-[350px]'
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <motion.div
          className={cn('relative w-full h-full overflow-hidden rounded-xl')}
          variants={imageVariants}
        >
          <Image
            src={imgUrl}
            alt={alt}
            fill
            className="rounded-xl object-cover"
            sizes="(max-width: 640px) 155px, (max-width: 768px) 180px, (max-width: 1024px) 190px, 200px"
            priority={false}
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    );
  }
);

ImageFrame.displayName = 'ImageFrame';

export default ImageFrame;
