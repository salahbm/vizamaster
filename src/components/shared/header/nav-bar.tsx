'use client';

import { motion } from 'framer-motion';
import navBars from './nav-list';
import React, { useRef, useState } from 'react';

import { usePathname } from 'next/navigation';
import { Link } from '@/i18n';

export const Navbar = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const pathname = usePathname();

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
    >
      {navBars.map((item) => (
        <Link href={item.path!} key={item.id}>
          <Tab setPosition={setPosition}>{item.name}</Tab>
        </Link>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      left: number;
      width: number;
      opacity: number;
    }>
  >;
}) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        // @ts-ignore
        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          // @ts-ignore
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer uppercase text-white mix-blend-difference px-5 py-3 text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
}) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0  rounded-full bg-black h-12"
    />
  );
};
