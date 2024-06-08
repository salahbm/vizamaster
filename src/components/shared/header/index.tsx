'use client';
import LanguageSelector from './lang-selector';
import MobileNavbar from './mobile-header';

import { motion } from 'framer-motion';
import { Navbar } from './nav-bar';

const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex flex-row justify-between md:items-center py-4 px-6">
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
