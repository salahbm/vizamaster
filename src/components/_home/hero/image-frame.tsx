'use client'
import Image from 'next/image';
import React from 'react';

import { motion } from 'framer-motion';

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
      className={`flex items-center justify-center w-[200px] m-1 rounded-xl ${
        type === 'square' ? 'h-[200px]' : 'h-[350px]'
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-xl ${
          type === 'square' ? 'w-[180px] h-[180px]' : 'w-[180px] h-[330px]'
        }`}
      >
        <Image
          src={imgUrl}
          alt="Picture"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
    </motion.div>
  );
};

export default ImageFrame;
