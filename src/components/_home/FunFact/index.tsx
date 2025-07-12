import Image from 'next/image';
import SectionHeader from '@/components/shared/SectionHeader';
import MotionDiv from '@/components/shared/motions/motion-div';
import { useTranslations } from 'next-intl';

const FunFact: React.FC = () => {
  const t = useTranslations('FunFact');

  return (
    <section className="relative ">
      {/* <!-- ===== Funfact Start ===== --> */}
      <div className="px-4 py-20 md:px-8 lg:py-22.5 2xl:px-0 rounded-2xl">
        <SectionHeader
          headerInfo={{
            subtitle: t('header.subtitle'),
            description: t('header.description'),
          }}
        />

        <div className="relative z-1 mx-auto max-w-c-1390 xl:py-27.5">
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
    </section>
  );
};

export default FunFact;
