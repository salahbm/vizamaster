import Image from 'next/image';
import SectionHeader from '@/components/shared/SectionHeader';
import MotionDiv from '@/components/shared/motions/motion-div';

const FunFact = () => {
  return (
    <section className="relative ">
      {/* <!-- ===== Funfact Start ===== --> */}
      <div className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0  rounded-2xl">
        <SectionHeader
          headerInfo={{
            subtitle: `our work in numbers`,
            description: `We are growing. Check out our numbers below.`,
          }}
        />

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
              We are a well-established recruitment and agency company with over
              a decade of experience, and here are some key statistics that
              showcase our work:
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
                1000+
              </h3>
              <p className="text-lg lg:text-para2">Annually</p>
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
                10+
              </h3>
              <p className="text-lg lg:text-para2">Locations</p>
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
                30+
              </h3>
              <p className="text-lg lg:text-para2">Vacancies</p>
            </MotionDiv>
          </div>
        </div>
      </div>
      {/* <!-- ===== Funfact End ===== --> */}
    </section>
  );
};

export default FunFact;
