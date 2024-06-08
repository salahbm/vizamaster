'use client';
import React from 'react';
import { motion } from 'framer-motion';
import navBars from './nav-list';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        {navBars.map((item) => (
          <motion.li
            key={item.id}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            className={cn(
              'flex items-center gap-x-2 text-slate-500 text-sm  pl-6  hover:text-slate-600 hover:bg-slate-300/20',
              pathname?.includes(item.path!) &&
                'text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700'
            )}
          >
            <Link href={item.path!}>{item.name}</Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
