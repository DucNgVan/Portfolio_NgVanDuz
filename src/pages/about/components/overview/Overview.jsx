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
            <h3 className="h3">The front-end developer&apos;s role </h3>
            <h3 className="h3">
              is like a kind host, <span className="medium">ensuring</span>
            </h3>
            <h3 className="h3">
              visitors have a <span className="medium">smooth</span> and
            </h3>
            <h3 className="h3">
              <span className="medium">enjoyable</span> experience.
            </h3>
          </AppearTitle>
        ) : (
          <AppearTitle key="desktop-queto">
            <h3 className="h3">
              The front-end developer&apos;s role is like a
            </h3>
            <h3 className="h3">
              kind host, <span className="medium">ensuring</span> visitors have
            </h3>
            <h3 className="h3">
              a <span className="medium">smooth</span> and{' '}
              <span className="medium">enjoyable</span> experience.
            </h3>
          </AppearTitle>
        )}
      </div>
      <div className={clsx(styles.text, 'p-l', styles.myStory)}>
        <AppearTitle>
          <span>Some words</span>
        </AppearTitle>
      </div>
      <div className={styles.desc}>
        {!isMobile ? (
          <AppearTitle key="desktop-overview">
            <h6 className="h6">
              Hey there! I&apos;m a software engineering student from Da Nang,
              Vietnam with a{' '}
            </h6>
            <h6 className="h6">
              passion for architecting reliable digital systems. I study
              software
            </h6>
            <h6 className="h6">
              engineering at University of Greenwich (Vietnam) to deepen my
              expertise in building
            </h6>
            <h6 className="h6">
              modern web applications, scalable APIs, and interactive 3D
              interfaces.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Ranked in Top 3 highest GPA students at Greenwich (2024), awarded
              Best Student in
            </h6>
            <h6 className="h6">
              COMP1643 (2026), and 2nd Place Winner at Impact Innovation
              Bootcamp (2025).
            </h6>
            <h6 className="h6">
              I love combining engineering precision with creative visual
              excellence.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>
              When I&apos;m not immersed in code, I enjoy continuous learning,
              competitive problem solving,
            </h6>
            <h6 className="h6">
              and collaborating on impactful open-source and real-world
              technology initiatives.
            </h6>

            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I&apos;m looking forward to collaborating and engineering
              something great!
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>Nguyen Van Duc.</h6>
          </AppearTitle>
        ) : (
          <AppearTitle key="mobile-overview">
            <h6 className="h6">
              Hey there! I&apos;m a software engineering student from Da Nang,
              Vietnam
            </h6>
            <h6 className="h6">
              with a passion for architecting reliable digital systems. I study
            </h6>
            <h6 className="h6">
              software engineering at University of Greenwich (Vietnam) to
              deepen
            </h6>
            <h6 className="h6">
              my expertise in building modern web apps and scalable APIs.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>
              Ranked in Top 3 highest GPA students at Greenwich (2024)
            </h6>
            <h6 className="h6">and awarded Best Student in COMP1643 (2026).</h6>
            <h6 className="h6">
              I love combining engineering precision with creative excellence.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>
              When I&apos;m not immersed in code, I enjoy continuous learning
            </h6>
            <h6 className="h6">
              and collaborating on impactful real-world technology projects.
            </h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>
              I&apos;m looking forward to collaborating and creating something
            </h6>
            <h6 className="h6">great!</h6>
            <h6 className={clsx(styles.paddingTop, 'h6')}>Nguyen Van Duc.</h6>
          </AppearTitle>
        )}
      </div>
    </section>
  );
}
export default Overview;
