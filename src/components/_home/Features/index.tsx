import React from 'react';
import featuresData from './featuresData';
import SingleFeature from './SingleFeature';
import SectionHeader from './SectionHeader';

const Feature = () => {
  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30 px-4 relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
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
