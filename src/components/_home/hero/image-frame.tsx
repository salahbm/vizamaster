'use client';

import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageFrameProps {
  imgUrl: string;
  type: 'square' | 'rectangle';
  alt: string;
  index?: number;
}

const ImageFrame = React.memo(
  ({ imgUrl, type, alt, index = 0 }: ImageFrameProps) => {
    return (
      <div
        className={cn(
          'flex items-center justify-center w-full rounded-xl overflow-hidden',
          type === 'square' ? 'h-[200px]' : 'h-[350px]'
        )}
      >
        <div
          className={cn('relative w-full h-full overflow-hidden rounded-xl')}
        >
          <Image
            src={imgUrl}
            alt={alt}
            fill
            className="rounded-xl object-cover"
            quality={100}
            priority={index < 2} // Prioritize loading the first two images
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        </div>
      </div>
    );
  }
);

ImageFrame.displayName = 'ImageFrame';

export default ImageFrame;
