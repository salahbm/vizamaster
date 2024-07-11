import ContactForm from '@/components/shared/contact-form.';
import SectionHeader from '@/components/shared/SectionHeader';
import SocialMediaCard from '@/components/shared/social-media';
import { BookUser, Clock3, Mail, PhoneCall } from 'lucide-react';

const Contact = () => {
  return (
    <section className="my-20" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          headerInfo={{
            title: `Contacts`,
            subtitle: `Get in touch`,
            description: `Get in touch with us. We will get back to you as soon as possible.`,
          }}
        />
        <div className="flex items-center justify-center">
          <div className="grid md:grid-cols-2 mt-12 place-content-center items-center  justify-center">
            <div className="h-full pr-6">
              <ul className="mb-6 md:mb-0">
                <br />
                <br />
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-gray-50">
                    <BookUser />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Our Address
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Otaboy Eshonov 40 A
                    </p>
                    <p className="text-gray-600 dark:text-slate-400">
                      Bukhara, Uzbekistan
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
                      Contact
                    </h3>

                    <p className="text-gray-600 dark:text-slate-400">
                      +998 95 608-70-70
                      <br /> +998 95 608-00-70 <br />
                      +998 95 506-70-07
                    </p>
                  </div>
                </li>{' '}
                <br />
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-gray-50">
                    <Mail />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Mail:
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      bsglobalinfo@mail.ru <br /> main@bsglobal.uz
                    </p>
                  </div>
                </li>{' '}
                <br />
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-gray-50">
                    <Clock3 />
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      Working hours
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400">
                      Monday - Friday: 09:00 - 17:00
                    </p>
                    <p className="text-gray-600 dark:text-slate-400">
                      Saturday &amp; Sunday: 09:00 - 13:00
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
      <SocialMediaCard />
    </section>
  );
};

export default Contact;
