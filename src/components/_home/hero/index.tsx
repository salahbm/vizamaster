import Image from 'next/image';
import { useState } from 'react';
import HeroBanner from './hero-banner';

const Hero = () => {
  return (
    <section className="mt-40">
      <div className="px-4 md:px-8 2xl:px-0 w-full">
        <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
          <div className=" md:w-1/2">
            <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
              🔥 Solid - A Complete SaaS Web Template
            </h4>
            <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
              Free Next.js Template for {'   '}
              <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                SaaS
              </span>
            </h1>
            <p>
              Solid Pro - Packed with all the key integrations you need for
              swift SaaS startup launch, including - Auth, Database, Sanity
              Blog, Essential Components, Pages and More. Built-winth - Next.js
              13, React 18 and TypeScript.
            </p>
          </div>

          <div className="animate_right hidden md:w-1/2 lg:block">
            <div className="relative 2xl:-mr-7.5">
              <HeroBanner />
              <div className=" relative aspect-[700/444] w-full">
                <HeroBanner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
