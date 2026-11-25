/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Nguyen Van Duc - About',
  description:
    'Learn about my journey, values, academic achievements at Greenwich, and commitment to engineering quality web and app solutions.',
  keywords: [
    'Nguyen Van Duc',
    'About Nguyen Van Duc',
    'About me',
    'Software Engineer Journey',
    'Greenwich Vietnam',
    'Fullstack Developer',
    'Developer Profile',
    'Quality Web Solutions',
  ],
};
function Page() {
  return (
    <>
      <CustomHead {...seo} />

      <Hero />
      <Overview />
      <Services />
      <Process />
    </>
  );
}

export default Page;
