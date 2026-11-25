import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/about/styles/about.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function About() {
  const isMobile = useIsMobile();
  const rootRef = useRef();
  const animatedImageRef = useRef();

  const setupScrollAnimation = () => {
    const ctx = gsap.context(() => {
      gsap.set(animatedImageRef.current, { top: !isMobile ? '-20vw' : '0' });
      if (!isMobile) {
        gsap.to(animatedImageRef.current, {
          top: '20vw',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: document?.querySelector('main'),
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupScrollAnimation();
    return () => ctx.kill();
  }, [isMobile]);

  const renderImageContainer = () => (
    <div className={styles.imageContainer}>
      <Image
        priority
        src="/giats/front.webp"
        sizes="(max-width: 768px) 80vw, 35vw"
        fill
        style={{ objectFit: 'cover' }}
        alt="Nguyen Van Duc"
      />
    </div>
  );

  return (
    <section ref={rootRef} className={styles.root}>
      <div className={clsx(styles.nameContainer, 'layout-block-inner')}>
        <AppearTitle>
          <h1 className={clsx('h1', 'medium')}>Hey, My name&apos;s</h1>
          <h1 className={clsx('h1', 'medium')}>Nguyen Van Duc!</h1>
        </AppearTitle>
      </div>

      <div className={clsx(styles.container, 'layout-grid-inner')}>
        {isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapper)} ref={animatedImageRef}>
          <AppearTitle>
            <div className="p-l">“My engineering journey as a software</div>
            <div className="p-l">
              developer empowers me to solve complex problems
            </div>
            <div className="p-l">
              creatively and efficiently, building resilient
            </div>
            <div className="p-l">systems and successful project outcomes”</div>
          </AppearTitle>
        </div>
        {!isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapperBottom)}>
          {!isMobile ? (
            <AppearTitle key="desktop-descWrapperBottom">
              <h6 className="h6">
                A passionate software engineer hailing from Da Nang, Vietnam.
              </h6>
              <h6 className="h6">
                Studying BSc (Hons) Software Engineering at Greenwich. With a
              </h6>
              <h6 className="h6">
                strong dedication to creating seamless user experiences. I
                specialize
              </h6>
              <h6 className="h6">
                in bringing high-performance web applications to life with clean
              </h6>
              <h6 className="h6">and efficient, scalable code.</h6>
            </AppearTitle>
          ) : (
            <AppearTitle key="mobile-descWrapperBottom">
              <h6 className="h6">
                A passionate software engineer hailing from Da Nang, Vietnam.
              </h6>
              <h6 className="h6">
                Studying BSc (Hons) Software Engineering at Greenwich. With a
              </h6>
              <h6 className="h6">
                strong dedication to creating seamless user experiences. I
                specialize
              </h6>
              <h6 className="h6">
                in bringing high-performance web applications to life with clean
              </h6>
              <h6 className="h6">and efficient, scalable code.</h6>
            </AppearTitle>
          )}
          <div className={clsx(styles.buttonContainer)}>
            <ButtonLink href="/about" label="ABOUT ME" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
