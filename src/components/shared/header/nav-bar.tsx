'use client';
import { motion } from 'framer-motion';
import navBars from './nav-list';
import React, { useRef, useState } from 'react';

import { Link } from '@/i18n';
import { cn } from '@/lib/utils';

export const Navbar = ({ color }: { color: boolean }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className={cn(
        'flex w-full rounded-full border-black ',
        color ? 'border-none bg-transparent' : 'border blurly-white'
      )}
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
      className={cn(
        'relative z-10 block cursor-pointer uppercase text-black blend-difference-enhanced px-5  text-base py-3'
      )}
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
      className={cn('absolute z-0  rounded-full bg-[var(--primary)] h-12')}
    />
  );
};
