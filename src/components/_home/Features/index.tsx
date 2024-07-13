import React from 'react';
import SingleFeature from './SingleFeature';
import SectionHeader from '../../shared/SectionHeader';
import { useTranslations } from 'next-intl';

interface FeatureType {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const Feature: React.FC = () => {
  const t = useTranslations('Feature');

  const featuresData: FeatureType[] = [
    {
      id: 1,
      icon: '/icons/icon-01.svg',
      title: t('features.tailoredInternshipPrograms.title'),
      description: t('features.tailoredInternshipPrograms.description'),
    },
    {
      id: 2,
      icon: '/icons/icon-05.svg',
      title: t('features.professionalResumeBuilding.title'),
      description: t('features.professionalResumeBuilding.description'),
    },
    {
      id: 3,
      icon: '/icons/icon-03.svg',
      title: t('features.globalJobPlacements.title'),
      description: t('features.globalJobPlacements.description'),
    },
    {
      id: 4,
      icon: '/icons/icon-04.svg',
      title: t('features.comprehensiveInterviewPreparation.title'),
      description: t('features.comprehensiveInterviewPreparation.description'),
    },
  ];

  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30 px-4 ">
        {/* <!-- Section Title Start --> */}
        <SectionHeader
          headerInfo={{
            title: t('header.title'),
            subtitle: t('header.subtitle'),
            description: t('header.description'),
          }}
        />
        {/* <!-- Section Title End --> */}
        <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 ">
          {/* <!-- Features item Start --> */}
          {featuresData.map((feature) => (
            <SingleFeature feature={feature} key={feature.id} />
          ))}
          {/* <!-- Features item End --> */}
        </div>
      </section>
    </>
  );
};

export default Feature;
