'use client';
import Image from 'next/image';
import React from 'react';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ImageFrame = ({
  imgUrl,
  type,
}: {
  imgUrl: string;
  type: 'square' | 'rectangle';
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className={cn(
        `flex items-center justify-center w-[150px] sm:w-[170px] md:w-[190px] lg:w-[200px] m-1 rounded-xl overflow-x-hidden`,
        type === 'square' ? 'h-[200px]' : 'h-[350px]'
      )}
    >
      <div
        className={cn(
          `relative overflow-hidden rounded-xl`,
          type === 'square' ? 'w-[180px] h-[180px]' : 'w-[180px] h-[330px]'
        )}
      >
        <Image
          src={imgUrl}
          alt="Picture"
          fill
          className="rounded-xl object-cover"
          sizes="(100vw, 100vh)"
        />
      </div>
    </motion.div>
  );
};

export default ImageFrame;
