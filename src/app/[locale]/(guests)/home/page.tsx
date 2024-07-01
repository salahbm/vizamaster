import Feature from '@/components/_home/Features';
import FunFact from '@/components/_home/FunFact';
import Hero from '@/components/_home/hero';
import PeopleMarquee from '@/components/_home/marquee';
import { Process } from '@/components/_home/process';
import Blog from '@/components/Blog';
import MyGlobe from '@/components/shared/globe';

const Home = () => {
  return (
    <>
      <Hero />
      <Feature />
      <Blog />
      <MyGlobe />
      <Process />
      <PeopleMarquee />
      <FunFact />
    </>
  );
};

export default Home;
