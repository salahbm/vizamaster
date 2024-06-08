'use client';
import MobileNavbar from './mobile-header';
import Navbar from './nav-bar';
import { motion } from 'framer-motion';

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
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
