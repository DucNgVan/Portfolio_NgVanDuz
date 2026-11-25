import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import styles from '@src/pages/about/components/overview/styles/overview.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';

function Overview() {
  const isMobile = useIsMobile();

  return (
    <section className={clsx(styles.root, 'layout-grid-inner')}>
      <div className={styles.title}>
        {isMobile ? (
          <AppearTitle key="mobile-queto">
            <h3 className="h3">Every great engineer begins with</h3>
            <h3 className="h3">
              solid fundamentals, <span className="medium">curiosity</span>
            </h3>
            <h3 className="h3">
              to learn, and the <span className="medium">humility</span> to turn
            </h3>
            <h3 className="h3">
              every code review into <span className="medium">growth</span>.
            </h3>
          </AppearTitle>
        ) : (
          <AppearTitle key="desktop-queto">
            <h3 className="h3">
              Every great engineer begins with solid
            </h3>
            <h3 className="h3">
              fundamentals, <span className="medium">curiosity</span> to learn, and the
            </h3>
            <h3 className="h3">
              <span className="medium">humility</span> to turn every code review into{' '}
              <span className="medium">growth</span>.
            </h3>
          </AppearTitle>
        )}
      </div>
      <div className={clsx(styles.text, 'p-l', styles.myStory)}>
        <AppearTitle>
          <span>About Me</span>
        </AppearTitle>
      </div>
      <div className={styles.desc}>
        {!isMobile ? (
          <AppearTitle key="desktop-overview">
            <h6 className="h6">
              Hi, I&apos;m Nguyen Van Duc — an undergraduate studying Software Engineering
              at University of Greenwich
            </h6>
            <h6 className="h6">
              (Da Nang, Vietnam). I am currently preparing for my first professional
              internship opportunity.
            </h6>
            <h6 className="h6">
              Rather than just studying theory, I love applying computer science fundamentals
              directly into functional,
            </h6>
            <h6 className="h6">
              end-to-end software applications across web, backend, and mobile stacks.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              What I&apos;ve built through coursework and real-world projects:
            </h6>
            <h6 className="h6">
              · Interactive 3D Web: Built Nét Studio with Next.js 14 and Three.js 3D product customizers.
            </h6>
            <h6 className="h6">
              · Backend & Database Architecture: Built Nomadix (FYP) with Node.js, Express, a 28-table 3NF PostgreSQL DB, Redis caching, and Docker.
            </h6>
            <h6 className="h6">
              · Fullstack & Mobile: Developed IT Helpdesk (Vue.js 3 + MongoDB) and M-Hike (Android Java & React Native).
            </h6>
            <h6 className="h6">
              · Workflow Automation: Automated volunteer & donation scheduling on SharePoint & Power Automate for Vava Da Nang.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Academic achievements include Top 3 Highest GPA Student at Greenwich (2024),
              Best Student in COMP1643
            </h6>
            <h6 className="h6">
              (Networking & Systems), 2nd Place at Impact Innovation Bootcamp (2024),
              and leading the Greenwich IT Club.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I am actively looking for an Internship in Frontend, Backend, or Fullstack development
              where I can learn
            </h6>
            <h6 className="h6">
              from senior engineers, absorb best practices, and contribute enthusiastically to production code.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>Nguyen Van Duc.</h6>
          </AppearTitle>
        ) : (
          <AppearTitle key="mobile-overview">
            <h6 className="h6">
              Hi, I&apos;m Nguyen Van Duc — an undergraduate studying Software Engineering
            </h6>
            <h6 className="h6">
              at University of Greenwich (Da Nang, Vietnam), actively seeking my first internship.
            </h6>
            <h6 className="h6">
              I love turning computer science fundamentals into practical applications across web and backend.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Hands-on project experience:
            </h6>
            <h6 className="h6">
              · 3D Web: Nét Studio (Next.js 14, Three.js WebGL).
            </h6>
            <h6 className="h6">
              · Backend: Nomadix FYP (Node.js, PostgreSQL 3NF, Redis, Docker).
            </h6>
            <h6 className="h6">
              · Fullstack & Mobile: IT Helpdesk (Vue.js 3 + MongoDB) and M-Hike (Android Java).
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Ranked Top 3 GPA at Greenwich (2024), Best Student in COMP1643,
            </h6>
            <h6 className="h6">
              and 2nd Place at Impact Innovation Bootcamp.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Eager to join an engineering team as an intern, learn from mentors,
            </h6>
            <h6 className="h6">
              and contribute to real-world software.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>Nguyen Van Duc.</h6>
          </AppearTitle>
        )}
      </div>
    </section>
  );
}
export default Overview;
