'use client';

import useWindowSize from '@/hooks/common/useWindowSize';
import styles from './process.module.scss';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

type ProcessPropObj = {
  id: string;
  title: string;
};

export function Process() {
  const content = useMemo(
    () => [
      {
        id: '1',
        title: 'DISCOVERY',
      },
      {
        id: '2',
        title: 'AUDIT',
      },
      {
        id: '3',
        title: 'CONCEPT & CREATION',
      },
      {
        id: '4',
        title: 'REVIEW',
      },
    ],
    []
  );

  // TODO: Fix black text color staggering animation on design page

  const [windowWidth] = useWindowSize();
  const processContainerRef = useRef(null);
  const isInView = useInView(processContainerRef);

  const boxVariant = {
    hidden: {
      x: -2,
    },
    visible: {
      x: 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.4,
      },
    },
  };

  const listVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const colorVariant = {
    hidden: {
      backgroundColor: '#fff',
    },
    visible: {
      backgroundColor: '#000',
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <section className={styles.processSection}>
      <h1 className={cn(styles.processTitle, 'largeText')}>
        OUR <span className="textGradient">PROCESS</span>
      </h1>
      <motion.div
        className={styles.processContainer}
        ref={processContainerRef}
        style={{
          height:
            windowWidth >= 1130 ? (content.length - 1) * 50 + 100 : 'auto',
        }}
        variants={boxVariant}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {content.map((item, i) => (
          <motion.div
            key={item.id}
            className={styles.processCard}
            style={{
              top: windowWidth >= 1130 ? i * 50 : '',
            }}
          >
            {i !== 0 && (
              <>
                <Image
                  className={styles.arrow}
                  src="/icons/process_arrow.svg"
                  alt="arrow"
                  width={82}
                  height={26}
                />
                <Image
                  className={styles.arrowSmall}
                  src="/icons/process_arrow_mobile.svg"
                  alt="arrow"
                  width={15}
                  height={48}
                />
              </>
            )}
            <motion.div
              className={styles.background}
              style={{ backgroundColor: `var(--primary)` }}
              variants={listVariant}
            />
            <motion.div
              className={styles.processText}
              variants={colorVariant}
              style={{ backgroundColor: '#fff' }}
            >
              {item.title}
            </motion.div>
            <motion.div
              className={styles.processNumber}
              variants={colorVariant}
              style={{ backgroundColor: '#fff' }}
            >
              {`0${i + 1}`}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
