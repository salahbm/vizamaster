import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';
import MotionDiv from '@/components/shared/motions/motion-div';

const ImageFrame = ({
  imgUrl,
  type,
}: {
  imgUrl: string;
  type: 'square' | 'rectangle';
}) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center  w-[155px] sm:w-[180px] md:w-[190px] lg:w-[200px] sm:m-1 rounded-xl overflow-x-hidden`,
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
    </div>
  );
};

export default ImageFrame;
