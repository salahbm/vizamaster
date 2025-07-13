import Image from 'next/image';
import React from 'react';

const Loader = () => {
  return (
    <div className="blurly-white bg-white flex justify-center items-center z-50 max-h-screen min-h-screen fixed inset-0 top-0 left-0 right-0 bottom-0 flex-col">
      <Image
        src={'/logos/dark_logo_nobg.gif'}
        width={150}
        height={150}
        alt="Loading..."
      />
      <p className="md:text-xl text-lg textGradient animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
