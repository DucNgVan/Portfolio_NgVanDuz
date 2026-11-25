import { useRef } from 'react';
import DeskScene from '@src/pages/components/home/components/deskScene/DeskScene';
import InfiniteText from '@src/components/animationComponents/infiniteText/Index';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/home/styles/home.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function Home() {
  const isMobile = useIsMobile();
  const rootRef = useRef();
  const infiniteTextRef = useRef();
  const [setFluidColor] = useStore(
    useShallow((state) => [state.setFluidColor]),
  );

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'dark') {
      setFluidColor('#ff6a3d');
    } else {
      setFluidColor('#d7d7d4');
    }
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top+=3%',
            end: 'top+=5%',
            toggleActions: 'play none reverse none',
            scroller: document.querySelector('main'),
            invalidateOnRefresh: true,
          },
        })
        .to(infiniteTextRef.current, {
          opacity: 0,
          duration: 0.6,
        });
    });

    return () => ctx.kill();
  }, []);

  return (
    <section ref={rootRef} className={clsx(styles.root)}>
      <div className={clsx(styles.topContainer, 'layout-grid-inner')}>
        <div className={styles.leftContainer}>
          <h2 className="h2">Software</h2>
          <h2 className={clsx('h2', 'bold')}>Engineering</h2>
        </div>
        {!isMobile && (
          <h6 className={clsx('h6', styles.rightContainer)}>
            Software Engineering Student at University of Greenwich (Vietnam) ·
            Top 3 GPA (2024). Passionate about web development, APIs, and
            interactive 3D experiences — ready for an internship opportunity.
          </h6>
        )}
      </div>

      <div className={styles.bottomContainer}>
        <DeskScene onThemeChange={handleThemeChange} />
      </div>

      {isMobile && (
        <div className={styles.rightContainerMobile}>
          <h6 className="h6">
            Software Engineering Student at University of Greenwich (Vietnam) ·
            Top 3 GPA (2024). Passionate about web development, APIs, and
            interactive 3D experiences — ready for an internship opportunity.
          </h6>
        </div>
      )}

      <div ref={infiniteTextRef} className={styles.infiniteContainer}>
        <InfiniteText text="Scroll Down" length={5} />
      </div>
    </section>
  );
}

export default Home;
