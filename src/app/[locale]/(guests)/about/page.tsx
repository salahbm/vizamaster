import About from '@/components/_about';
import { setRequestLocale } from 'next-intl/server';

const AboutPage = ({ params: { locale } }: { params: { locale: string } }) => {
  setRequestLocale(locale);
  return <About />;
};

export default AboutPage;
