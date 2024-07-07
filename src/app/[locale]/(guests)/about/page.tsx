import About from '@/components/_about';
import { unstable_setRequestLocale } from 'next-intl/server';

const AboutPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <About />;
};

export default AboutPage;
