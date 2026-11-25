import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import Badge from '@src/pages/components/clients/components/Badge';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/clients/styles/clients.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useWindowSize } from '@darkroom.engineering/hamo';

function Clients() {
  const isMobile = useIsMobile();
  const textRefs = useRef([]);
  const badgeRefs = useRef([]);
  const rootRef = useRef();
  const windowSize = useWindowSize();

  const setupScrollAnimation = () => {
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const vw = (coef) => windowSize.height * (coef / 100);
        textRefs.current.forEach((textRef, index) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: rootRef.current,
                start:
                  index === 0
                    ? `top-=${vw(35)}`
                    : `top+=${vw(35 + 5.5555556 * index)}`,
                end:
                  index === 0
                    ? `bottom-=${vw(35 + 5.5555556 * index)}`
                    : `bottom+=${vw(25)}`,
                toggleActions: 'play none reverse none',
                scrub: true,
                scroller: document?.querySelector('main'),
                invalidateOnRefresh: true,
              },
            })
            .to(textRef, {
              top: `${10 + 30 * index + 5.5555556 * index}vw`,
            });
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupScrollAnimation(textRefs, rootRef, windowSize, isMobile);
    return () => ctx.kill();
  }, [isMobile, windowSize.height]);

  return (
    <section ref={rootRef} className={clsx(styles.root, 'layout-grid-inner')}>
      <h1 className={clsx(styles.sectionTitle, 'h1')}>
        <AppearByWords>Honors & Awards</AppearByWords>
      </h1>
      {isMobile ? <div className={styles.mobileEmpty} /> : null}
      {isMobile ? (
        <div className={styles.mobileCount}>
          <AppearTitle>2024</AppearTitle>
        </div>
      ) : null}
      <div
        ref={(el) => {
          badgeRefs.current[0] = el;
        }}
        className={styles.first}
      >
        <Badge name="company1" />
      </div>
      {isMobile ? <div className={styles.mobileEmptySecond} /> : null}
      {isMobile ? (
        <div className={styles.textMobile}>
          <AppearTitle>
            <h4 className={clsx('h4', 'bold')}>Greenwich Vietnam</h4>
          </AppearTitle>
          <AppearTitle>
            <div className="p-l">
              Awarded for exceptional academic excellence
            </div>
            <div className="p-l">
              ranking in Top 3 highest GPA students across
            </div>
            <div className="p-l">Greenwich International Bachelor cohort.</div>
            <div className="p-l">Official Decision Ref: 157/QĐ-FPTUDN.</div>
          </AppearTitle>
        </div>
      ) : null}
      {!isMobile ? (
        <>
          <div className={styles.firstEmpty} />
          <div
            ref={(el) => {
              textRefs.current[0] = el;
            }}
            className={styles.firstText}
          >
            <AppearTitle>
              <h6 className="h6">2024</h6>
            </AppearTitle>
            <AppearTitle>
              <h4 className={clsx('h4', 'bold', styles.title)}>
                Greenwich Vietnam
              </h4>
            </AppearTitle>
            <AppearTitle>
              <div className="p-l">
                Awarded for exceptional academic excellence
              </div>
              <div className="p-l">
                ranking in Top 3 highest GPA students across
              </div>
              <div className="p-l">
                Greenwich International Bachelor cohort.
              </div>
              <div className="p-l">Official Decision Ref: 157/QĐ-FPTUDN.</div>
            </AppearTitle>
          </div>
        </>
      ) : null}
      {!isMobile ? <div className={styles.secondEmpty} /> : null}
      {isMobile ? <div className={styles.mobileEmpty} /> : null}
      {isMobile ? (
        <div className={styles.mobileCount}>
          <AppearTitle>2023</AppearTitle>
        </div>
      ) : null}
      <div
        ref={(el) => {
          badgeRefs.current[1] = el;
        }}
        className={styles.second}
      >
        <Badge name="company2" />
      </div>
      {isMobile ? <div className={styles.mobileEmptySecond} /> : null}
      {isMobile ? (
        <div className={styles.textMobile}>
          <AppearTitle>
            <h4 className={clsx('h4', 'bold')}>Hospital 199</h4>
          </AppearTitle>
          <AppearTitle>
            <div className="p-l">Second Place Winner at Impact Innovation</div>
            <div className="p-l">Bootcamp 2025 for engineering practical</div>
            <div className="p-l">digital healthcare & IoT technologies.</div>
          </AppearTitle>
        </div>
      ) : null}
      {!isMobile ? (
        <>
          <div
            ref={(el) => {
              textRefs.current[1] = el;
            }}
            className={styles.secondText}
          >
            <AppearTitle>
              <h6 className="h6">2025</h6>
            </AppearTitle>
            <AppearTitle>
              <h4 className={clsx('h4', 'bold', styles.title)}>Hospital 199</h4>
            </AppearTitle>
            <AppearTitle>
              <div className="p-l">
                Second Place Winner at Impact Innovation
              </div>
              <div className="p-l">Bootcamp 2025 for engineering practical</div>
              <div className="p-l">digital healthcare & IoT technologies.</div>
            </AppearTitle>
          </div>
          <div className={styles.fourthEmpty} />
        </>
      ) : null}
      {isMobile ? <div className={styles.mobileEmpty} /> : null}
      {isMobile ? (
        <div className={styles.mobileCount}>
          <AppearTitle>2026</AppearTitle>
        </div>
      ) : null}
      <div
        ref={(el) => {
          badgeRefs.current[2] = el;
        }}
        className={styles.third}
      >
        <Badge name="company3" />
      </div>
      {isMobile ? <div className={styles.mobileEmptySecond} /> : null}
      {isMobile ? (
        <div className={styles.textMobile}>
          <AppearTitle>
            <h4 className={clsx('h4', 'bold')}>COMP1643 Best Student</h4>
          </AppearTitle>
          <AppearTitle>
            <div className="p-l">Highest academic score in Information and</div>
            <div className="p-l">
              Content Management across Greenwich cohort.
            </div>
            <div className="p-l">Official Decision Ref: 181 QH-PPTUDN.</div>
          </AppearTitle>
        </div>
      ) : null}
      {!isMobile ? (
        <>
          <div className={styles.fifthEmpty} />
          <div
            ref={(el) => {
              textRefs.current[2] = el;
            }}
            className={styles.thirdText}
          >
            <AppearTitle>
              <h6 className="h6">2026</h6>
            </AppearTitle>
            <AppearTitle>
              <h4 className={clsx('h4', 'bold', styles.title)}>
                COMP1643 Best Student
              </h4>
            </AppearTitle>
            <AppearTitle>
              <div className="p-l">
                Highest academic score in Information and
              </div>
              <div className="p-l">
                Content Management across Greenwich cohort.
              </div>
              <div className="p-l">Official Decision Ref: 181 QH-PPTUDN.</div>
            </AppearTitle>
          </div>
        </>
      ) : null}
      <div className={styles.ctaContainer}>
        <ButtonLink href="/certificates" label="VIEW ALL CERTIFICATES & HONORS" />
      </div>
    </section>
  );
}

export default Clients;
