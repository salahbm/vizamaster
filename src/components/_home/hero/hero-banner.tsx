import React from 'react';
import ImageFrame from './image-frame';

const HeroBanner = () => {
  return (
    <div className="flex flex-row justify-center items-center lg:ml-4  ml-0 mt-8 lg:mt-0 gap-x-4">
      <div className="flex flex-col items-center">
        <ImageFrame imgUrl="/images/welder.jpeg" type="square" />
        <ImageFrame imgUrl="/images/worker.jpeg" type="rectangle" />
      </div>
      <div className="flex flex-col items-center">
        <ImageFrame imgUrl="/images/cook.jpeg" type="rectangle" />
        <ImageFrame imgUrl="/images/cleaner.jpeg" type="square" />
      </div>
      <div className="items-center md:block hidden justify-center">
        <ImageFrame imgUrl="/images/remont.jpeg" type="rectangle" />
      </div>
    </div>
  );
};

export default HeroBanner;
