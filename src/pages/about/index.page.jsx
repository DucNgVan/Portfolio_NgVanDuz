/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Nguyen Van Duc - About & Internship Profile',
  description:
    'Software Engineering undergraduate at University of Greenwich Vietnam (Da Nang) actively seeking an internship. Discover my hands-on projects, technical skills, and academic honors.',
  keywords: [
    'Nguyen Van Duc',
    'Nguyen Van Duc Portfolio',
    'Software Engineering Student',
    'Software Engineer Intern',
    'Frontend Intern',
    'Fullstack Intern',
    'Greenwich Vietnam Da Nang',
    'DUCNGVAN',
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
