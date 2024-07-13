import ContactForm from '@/components/shared/contact-form.';
import { BRAND_NAME } from '@/constants/name';
import { BookUser, Clock3, Mail, PhoneCall } from 'lucide-react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

const Partners = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Partners');

  return (
    <section className="my-20" id="contact">
      <div className=" px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ">
        <Image
          src="/images/partner.jpg"
          width={1000}
          height={400}
          alt="partners"
          className="object-cover shadow-lg w-full border rounded-xl border-gray-300 animate-fade-in-scale md:h-[450px] h-[250px]"
        />
        <div className="text-center justify-center items-center flex">
          <p className="my-16 text-center max-w-3xl text-lg text-gray-600">
            {t('description', { BRAND_NAME })}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid md:grid-cols-2 mt-12 place-content-center items-center justify-center">
            <div className="h-full pr-6">
              <ul className="mb-6 md:mb-0">
                <br />
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-gray-50">
                    <BookUser />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {t('details.addressTitle')}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      {t('details.address')
                        .split('\n')
                        .map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                    </p>
                  </div>
                </li>
                <br />
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-gray-50">
                    <PhoneCall />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {t('details.contactTitle')}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      {t('details.contactNumbers')
                        .split('\n')
                        .map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                    </p>
                  </div>
                </li>
                <br />
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-gray-50">
                    <Mail />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {t('details.mailTitle')}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      {t('details.emails')
                        .split('\n')
                        .map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                    </p>
                  </div>
                </li>
                <br />
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-gray-50">
                    <Clock3 />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {t('details.hoursTitle')}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      {t('details.workingHours')
                        .split('\n')
                        .map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
