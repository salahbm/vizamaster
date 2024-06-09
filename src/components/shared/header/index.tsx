'use client';
import LanguageSelector from './lang-selector';
import MobileNavbar from './mobile-header';

import { motion } from 'framer-motion';
import { Navbar } from './nav-bar';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
      className="fixed top-0 left-0 w-full z-50 transition duration-300"
    >
      <div
        className={cn(
          'container mx-auto flex flex-row justify-between items-center py-4 px-6 transition duration-300 bg-orange-300',
          color && 'blurly-white shadow-md border-lg'
        )}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          MyLogo
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hidden md:block">
            <Navbar />
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
