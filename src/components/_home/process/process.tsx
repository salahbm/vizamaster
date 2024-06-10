'use client';

import useWindowSize from '@/hooks/common/useWindowSize';
import styles from './process.module.scss';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

export function Process() {
  const content = useMemo(
    () => [
      {
        id: '1',
        title: 'APPLY',
      },
      {
        id: '2',
        title: 'INTERVIEW',
      },
      {
        id: '3',
        title: 'VISA APPROVAL',
      },
      {
        id: '4',
        title: 'START JOB',
      },
    ],
    []
  );

  // TODO: Fix black text color staggering animation on design page

  const [windowWidth] = useWindowSize();
  const noticeRef = useRef(null);
  const isNoticeInView = useInView(noticeRef);
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
      backgroundColor: '#3E3E87',
    },
    visible: {
      backgroundColor: '#000',
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <section
      className={cn('relative overflow-x-hidden py-8', styles.processSection)}
    >
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />
      <h1 className={cn(styles.processTitle, 'largeText')}>
        OUR <span className="textGradient">PROCESS</span>
      </h1>

      <p className="mx-auto mt-8 md:w-4/5 lg:w-3/5 xl:w-[46%] text-center bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-2xl shadow-md cursor-pointer z-50 text-neutral-600">
        NOTE 💡: Depending on the job, country and personal preference process
        can differ for each applicant
      </p>

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
            className={cn(styles.processCard, 'rounded-2xl shadow-lg')}
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
