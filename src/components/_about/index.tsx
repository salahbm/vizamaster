'use client';
import MotionDiv from '../shared/motions/motion-div';
import { ArrowDown } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
const About = () => {
  const t = useTranslations('About');

  const sections = useMemo(
    () => [
      {
        id: 1,
        title: t('sections.mission.title'),
        content: t('sections.mission.content'),
      },
      {
        id: 2,
        title: t('sections.history.title'),
        content: t('sections.history.content'),
      },
      {
        id: 3,
        title: t('sections.values.title'),
        content: t('sections.values.content'),
      },
      {
        id: 4,
        title: t('sections.team.title'),
        content: t('sections.team.content'),
      },
      {
        id: 5,
        title: t('sections.services.title'),
        content: t('sections.services.content'),
      },
    ],
    [t]
  );

  return (
    <section className="mt-35 p-4">
      <div className="animate-fade-in-scale relative justify-center items-center flex-col flex h-[450px] px-21">
        <div className="mb-4 inline-block rounded-full bg-purple-600 px-4.5 py-1.5 dark:border dark:border-gray-700 dark:bg-gray-900">
          <span className="text-sectiontitle font-medium text-white dark:text-white">
            {t('header.title')}
          </span>
        </div>
        <p className="textGradient largeText text-black dark:text-white">
          {t('header.description')}
        </p>
        <div className="my-16 animate-bounce text-primary rounded-full blurly-white px-4 py-1.5 flex flex-row">
          <span className="text-sectiontitle font-medium text-black dark:text-white">
            {t('scrollDown')}
          </span>
          <ArrowDown />
        </div>
        <div className="rounded-full absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-800 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30 pt-40">
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex flex-col gap-8 lg:gap-32.5">
            {sections.map((section, index) => (
              <MotionDiv
                key={section.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: index % 2 === 0 ? -20 : 20,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.3, delay: 0.05 }}
                viewport={{ once: true }}
                className={`animate_right grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32.5 lg:text-center ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex items-center md:justify-center">
                  <div className="flex h-15 w-15 items-center justify-center rounded-full border border-primary dark:border-gray-700 dark:bg-gray-900 ">
                    <p className="text-metatitle2 font-semibold text-secondary dark:text-white ">
                      {section.id < 10 ? `0${section.id}` : section.id}
                    </p>
                  </div>
                  <div className="ml-4">
                    <h3 className="mb-0.5 textGradient">{section.title}</h3>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 animate-fade-in-scale">
                    {section.content}
                  </p>
                </div>
                <Separator className="block lg:hidden" />
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
