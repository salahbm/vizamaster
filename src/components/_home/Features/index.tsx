import React from 'react';
import featuresData from './featuresData';
import SingleFeature from './SingleFeature';
import SectionHeader from '../../shared/SectionHeader';

const Feature = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30 px-4 ">
        {/* <!-- Section Title Start --> */}
        <SectionHeader
          headerInfo={{
            title: 'SOLID FEATURES',
            subtitle: 'Core Services We Offer',
            description: `Success Begins with a solid foundation.`,
          }}
        />

        {/* <!-- Section Title End --> */}

        <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 ">
          {/* <!-- Features item Start --> */}

          {featuresData.map((feature, key) => (
            <SingleFeature feature={feature} key={key} />
          ))}
          {/* <!-- Features item End --> */}
        </div>
      </section>

      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default Feature;
