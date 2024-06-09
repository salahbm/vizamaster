'use client';
import LanguageSelector from './lang-selector';
import MobileNavbar from './mobile-header';

import { motion } from 'framer-motion';
import { Navbar } from './nav-bar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Header = () => {
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 250) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  window.addEventListener('scroll', changeColor);

  return (
    <header
      id="navbar"
      className={cn('fixed top-0 left-0 w-full z-50 ', color && ' top-1 px-4')}
    >
      <div
        className={cn(
          'container px-10  flex flex-row justify-between items-center  transition duration-600 bg-orange-300 py-3',
          color && 'blurly-white shadow-md rounded-3xl border border-black py-0'
        )}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-[50px] flex justify-center items-center">
            <Image
              src="/logos/dark_logo.png"
              alt="logo"
              width={400}
              height={10}
            />
            <p
              className={cn(
                'text-sm md:text-lg font-bold whitespace-nowrap -ml-2'
              )}
            >
              BS <span className="textGradient">GROUP</span>
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hidden md:block">
            <Navbar color={color} />
          </div>
          <div className="md:hidden">
            <MobileNavbar />
          </div>
        </motion.div>
        <div className="hidden md:block">
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LanguageSelector />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
