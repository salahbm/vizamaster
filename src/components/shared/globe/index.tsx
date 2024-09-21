'use client';

import { Capital, capitals } from './globe-data';

import { useEffect, useMemo, useState } from 'react';

import dynamic from 'next/dynamic';
import SectionHeader from '@/components/shared/SectionHeader';
import { useTranslations } from 'next-intl';
import { useIsWindows } from '@/hooks/common/useWindows';

// Utility function to check for WebGL support
const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

const MyGlobe = () => {
  const t = useTranslations('Globe');
  const isWindows = useIsWindows();
  const GlobeView = useMemo(
    () => dynamic(() => import('./globe-comp'), { ssr: false }),
    []
  );

  const [capitalToPass, setCapitalToPass] = useState<Capital>();

  function handleClick(capital: any) {
    setCapitalToPass(capital);
  }

  const webGLSupported = isWebGLSupported();

  return (
    <>
      {!webGLSupported ? (
        <div className="relative w-full pb-12">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

          <SectionHeader
            headerInfo={{
              subtitle: t('title'),
              description: t('description'),
            }}
          />
          <div className="flex flex-wrap justify-center items-center p-4 mb-16 mt-8">
            {capitals.map((capital) => (
              <div
                key={capital.lat}
                className="cursor-pointer text-orange-500 hover:text-purple-500 m-2 p-4 border-2  shadow-lg hover:border-purple-500 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleClick(capital)}
              >
                <div className="text-center">
                  <div className="font-semibold text-lg">{capital.country}</div>
                  {isWindows && <div className="text-3xl">{capital.flag}</div>}
                </div>
              </div>
            ))}
          </div>
          <GlobeView data={capitalToPass!} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyGlobe;
