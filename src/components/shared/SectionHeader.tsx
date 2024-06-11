import MotionDiv from './motions/motion-div';

type HeaderInfo = {
  title?: string;
  subtitle: string;
  description: string;
};

const SectionHeader = ({ headerInfo }: { headerInfo: HeaderInfo }) => {
  const { title, subtitle, description } = headerInfo;
  const words = subtitle.split(' ');
  const firstWord = words[0];
  const restOfWords = words.slice(1).join(' ');
  return (
    <>
      {/* <!-- Section Title Start --> */}
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
        className="animate_top mx-auto text-center "
      >
        {title && (
          <div className="mb-4 inline-block rounded-full bg-purple-400 px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection">
            <span className="text-sectiontitle font-medium text-white dark:text-white">
              {title}
            </span>
          </div>
        )}
        <div className="px-2 text-center mt-8">
          <h1 className="largeText font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            {firstWord}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500 ">
              {` ${restOfWords}`}
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 my-8">
            {description}
          </p>
        </div>
      </MotionDiv>
      {/* <!-- Section Title End --> */}
    </>
  );
};

export default SectionHeader;
