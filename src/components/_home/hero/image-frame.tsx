import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const ImageFrame = ({
  imgUrl,
  type,
}: {
  imgUrl: string;
  type: 'square' | 'regtangle';
}) => {
  return (
    <div
      className={cn('w-full', type === 'square' ? 'h-[200px]' : 'h-[400px]')}
    >
      <Image
        src={imgUrl}
        alt="Picture of the author"
        width={type === 'square' ? 200 : 200}
        height={type === 'square' ? 200 : 400}
      />
    </div>
  );
};

export default ImageFrame;
