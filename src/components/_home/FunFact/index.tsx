import Image from 'next/image';
import SectionHeader from '@/components/shared/SectionHeader';
import MotionDiv from '@/components/shared/motions/motion-div';
import { useTranslations } from 'next-intl';

const FunFact: React.FC = () => {
  const t = useTranslations('FunFact');

  return (
    <section className="relative">
      {/* <!-- ===== Funfact Start ===== --> */}
      <div className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0 rounded-2xl">
        <SectionHeader
          headerInfo={{
            subtitle: t('header.subtitle'),
            description: t('header.description'),
          }}
        />

        <div className="relative z-1 mx-auto max-w-c-1390 py-8">
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
              {t('trustedBy')}
            </h2>
            <p className="mx-auto lg:w-11/12">{t('trustedDescription')}</p>
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
              <p className="text-lg lg:text-para2">
                {t('stats.clients.label')}
              </p>
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
                {t('stats.locations.count')}
              </h3>
              <p className="text-lg lg:text-para2">
                {t('stats.locations.label')}
              </p>
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
                {t('stats.vacancies.count')}
              </h3>
              <p className="text-lg lg:text-para2">
                {t('stats.vacancies.label')}
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>
      {/* <!-- ===== Funfact End ===== --> */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
        {/* Option 1: Slide Animation Button */}
        {/* <a 
          href="/results" 
          className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded-full shadow-md hover:scale-105">
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">
            {t('viewAll')}
          </span>
          <span className="relative invisible">{t('viewAll')}</span>
        </a> */}

        {/* Option 2: Gradient Button with Hover Effect */}
        <a
          href="/results"
          className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white rounded-full shadow-md bg-gradient-to-r from-primary to-fuchsia-500 hover:from-fuchsia-500 hover:to-primary transition-all duration-500 transform hover:scale-105 group"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="flex items-center gap-2">
            {t('viewAll')}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </span>
        </a>

        {/* Option 3: Neon Glow Button */}
        {/* <a
          href="/results"
          className="relative inline-flex items-center justify-center px-8 py-3 font-semibold text-primary transition-all duration-300 bg-transparent border-2 border-primary rounded-full hover:bg-primary hover:text-white shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.9)] group"
        >
          <span className="flex items-center gap-2">
            {t('viewAll')}
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </span>
        </a> */}
      </div>
    </section>
  );
};

export default FunFact;
