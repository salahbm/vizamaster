import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import ImageFrame from './image-frame';

const HeroBanner = () => {
  return (
    <div>
      <ImageFrame imgUrl="/images/welder.jpg" type="square" />
      {/* <ImageFrame imgUrl="/images/worker.jpg" type="regtangle" /> */}
    </div>
  );
};

export default HeroBanner;
