import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/shared/SectionHeader';
import { BRAND_NAME } from '@/constants/name';
import MotionDiv from '@/components/shared/motions/motion-div';

const FunFact = () => {
  return (
    <>
      {/* <!-- ===== Funfact Start ===== --> */}
      <section className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0 relative rounded-2xl">
        <SectionHeader
          headerInfo={{
            subtitle: `our work in numbers`,
            description: `We are growing. Check out our numbers below.`,
          }}
        />
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-40 -z-10 m-auto h-[500px] w-[500px] rounded-full bg-purple-400 opacity-30 blur-[100px]"></div>
        </div>
        <div className="relative z-1 mx-auto max-w-c-1390  xl:py-27.5">
          <Image
            width={132}
            height={132}
            src="/shapes/shape-05.png"
            alt="Doodle"
            className="absolute bottom-0 right-0 -z-1"
          />

          <MotionDiv
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mx-auto mb-12.5 px-4 text-center md:w-4/5 md:px-0 lg:mb-17.5 lg:w-2/3 xl:w-1/2"
          >
            <h2 className="mb-4 text-3xl font-bold text-neutral-600 dark:text-white xl:text-sectiontitle3">
              Trusted by MANY.
            </h2>
            <p className="mx-auto lg:w-11/12">
              We are growing. Check out our numbers below. We are growing. Check
              out our numbers below. We are growing. Check out our numbers
              below. We are growing. Check out our numbers below.
            </p>
          </MotionDiv>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-42.5">
            <MotionDiv
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-2.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                5000
              </h3>
              <p className="text-lg lg:text-para2">World Wide Clients</p>
            </MotionDiv>
            <MotionDiv
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-2.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                1M+
              </h3>
              <p className="text-lg lg:text-para2">Downloads</p>
            </MotionDiv>
            <MotionDiv
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="animate_top text-center"
            >
              <h3 className="mb-2.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                865
              </h3>
              <p className="text-lg lg:text-para2">Winning Award</p>
            </MotionDiv>
          </div>
        </div>
      </section>
      {/* <!-- ===== Funfact End ===== --> */}
    </>
  );
};

export default FunFact;
