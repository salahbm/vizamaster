import { BRAND_NAME } from '@/constants/name';
import HeroBanner from './hero-banner';
import { Link } from '@/i18n';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center lg:flex-row flex-col lg:justify-between pt-30 lg:w-screen lg:-translate-x-[50%] lg:ml-[50%]">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div className="animate-fade-in-scale max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:flex-row flex flex-col items-center justify-between">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl  font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
            Unlock Your
            <span className="textGradient"> Global Career Potential</span>
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
            Welcome to {BRAND_NAME}, your trusted partner in securing top-tier
            internships, exchange programs, and employment opportunities
            worldwide. Whether you are aiming for prestigious roles in the any
            spot of the world journey to a rewarding career with us today.
          </p>
          <div className="flex items-center justify-start flex-row gap-x-2">
            <Link href={'/jobs'}>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-orange-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Get Started
              </button>
            </Link>
            <p className=" text-gray-600  md:text-lg lg:text-xl  ">
              Secure Your Spot Today
            </p>
          </div>
        </div>

        <HeroBanner />
      </div>
    </section>
  );
};

export default Hero;
