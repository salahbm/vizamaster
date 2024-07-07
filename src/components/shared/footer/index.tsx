import Image from 'next/image';
import { Link } from '@/i18n';
import MotionDiv from '../motions/motion-div';
import { cn } from '@/lib/utils';
import { footerList_2 } from './footer-list';
import { Instagram, Send } from 'lucide-react';

const Footer = () => {
  return (
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
      className="animate_top"
    >
      <footer className="bg-white dark:bg-gray-900">
        <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700" />
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
                Subscribe our newsletter to get update.
              </h1>

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <input
                  id="email"
                  type="text"
                  className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Email Address"
                />

                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                  Subscribe
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Quick Link
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <Link
                  href="#"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300  hover:underline "
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300  hover:underline "
                >
                  Who We Are
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300  hover:underline "
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                Pages
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                {footerList_2.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path!}
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300  hover:underline "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200 md:my-14 dark:border-gray-700" />

          <div className="flex items-center justify-between flex-row">
            <Link
              href="#"
              className="flex items-center justify-start  flex-row"
            >
              <Image
                src="/logos/dark_logo.png"
                alt="logo"
                width={70}
                height={70}
                className="object-cover"
              />

              <p
                className={cn(
                  'text-sm md:text-lg font-bold whitespace-nowrap -ml-1'
                )}
              >
                BS <span className="textGradient">GROUP</span>
              </p>
            </Link>

            <div className="flex -mx-2">
              <Link
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 "
                aria-label="Reddit"
              >
                <Instagram />
              </Link>

              <Link
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 "
                aria-label="Facebook"
              >
                <Send />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </MotionDiv>
  );
};

export default Footer;
