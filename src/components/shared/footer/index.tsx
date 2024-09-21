import Image from 'next/image';
import { Link } from '@/i18n';
import MotionDiv from '../motions/motion-div';
import { cn } from '@/lib/utils';
import { footerList_2 } from './footer-list';
import { Instagram, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
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
                {t('contactUs')}
              </h1>

              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <input
                  id="email"
                  type="text"
                  className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Email Address"
                />

                <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                  {t('subscribe')}
                </button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {t('quickLinks')}
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                <Link
                  href="/"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300  hover:underline "
                >
                  {t('home')}
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300  hover:underline "
                >
                  {t('about')}
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 transition-colors duration-300 dark:text-gray-300  hover:underline "
                >
                  {t('contact')}
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {t('pages')}
              </p>

              <div className="flex flex-col items-start mt-5 space-y-2">
                {footerList_2.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path!}
                    className="text-gray-600 transition-colors duration-300 dark:text-gray-300  hover:underline "
                  >
                    {t(item.name.toLocaleLowerCase())}
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
                <span className="textGradient">BS Group</span>
              </p>
            </Link>

            <div className="flex -mx-2">
              <Link
                href="https://www.instagram.com/bsglobal_official/"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 "
                aria-label="Reddit"
              >
                <Instagram />
              </Link>

              <Link
                href="https://telegram.me/BSGlobal"
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
