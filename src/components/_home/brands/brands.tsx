'use client';

import useWindowSize from '@/hooks/common/useWindowSize';
import styles from './brands.module.scss';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export function Brands() {
  const [windowWidth] = useWindowSize();
  function getMaxWidth(maxWidth: number | undefined) {
    if (windowWidth > 500) {
      return maxWidth;
    } else if (maxWidth) {
      return maxWidth * 0.7;
    } else return 150 * 0.7;
  }

  const content = useMemo(
    () => [
      {
        id: '1',
        brand: 'Kmart',
        src: '/images/brand.svg',
      },
      {
        id: '2',
        brand: 'Cutly',
        src: '/images/brand.svg',
        maxWidth: 110,
        width: '85%',
      },
      {
        id: '3',
        brand: 'Juluwarlu',
        src: '/images/brand.svg',
        maxWidth: 137,
        width: '95%',
      },
      {
        id: '4',
        brand: 'Illuminix',
        src: '/images/brand.svg',
        maxWidth: 145,
        width: '118%',
      },
      {
        id: '5',
        brand: 'Cupples Construction',
        src: '/images/brand.svg',
        maxWidth: 93,
        width: '73%',
      },
      {
        id: '6',
        brand: 'Auckland Museum',
        src: '/images/brand.svg',
        maxWidth: 130,
        width: '105%',
      },
    ],
    []
  );

  return (
    <section id="clients" className={styles.brandsSection}>
      <h1 className={cn('largeText', styles.brandsTitle)}>
        OUR TRUSTED <br className={styles.titleBreak} />{' '}
        <span className="textGradient">PARTNERS</span>
      </h1>
      <div className={cn(styles.brandsGrid, styles.threeCols)}>
        {content.map((brand) => (
          <Image
            key={brand.id}
            className={styles.brandLogo}
            src={brand.src}
            alt={brand.brand}
            width={brand.maxWidth || 150}
            height={150}
            style={{
              maxWidth: getMaxWidth(brand.maxWidth),
              width: brand.width,
            }}
          />
        ))}
      </div>
    </section>
  );
}
