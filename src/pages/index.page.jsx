/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Quote from '@src/pages/components/quote/Index';
import Projects from '@src/pages/components/projects/Index';
import Clients from '@src/pages/components/clients/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Nguyen Van Duc - Software Engineer Portfolio',
  description:
    'Software engineering student at University of Greenwich (Vietnam), crafting sleek, high-performance web applications, scalable distributed backends, and creative 3D environments.',
  keywords: [
    'Nguyen Van Duc',
    'DucNgVan',
    'Software Engineer',
    'Frontend',
    'Fullstack',
    'University of Greenwich',
    'Greenwich Vietnam',
    'Portfolio',
    'React',
    'Next.js',
    'Three.js',
    'JavaScript',
    'TypeScript',
    'Web Development',
    'Node.js',
    'PostgreSQL',
  ],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <Home />
      <About />
      <Clients />
      <Quote />
      <Projects />
    </>
  );
}

export default Page;
