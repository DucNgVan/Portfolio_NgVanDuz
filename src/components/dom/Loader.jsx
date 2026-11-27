import clsx from 'clsx';
import gsap from 'gsap';
import styles from '@src/components/dom/styles/loader.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

const HELLO_PATH_D =
  'M-109.06069946289062,95.92639923095703 C1.9544999599456787,157.6403045654297 103.11389923095703,236.9969940185547 217.881103515625,372.07550048828125 C296,464.2846984863281 337.9999084472656,569.5725708007812 340,642.1939697265625 C341,696.1920166015625 314.6702880859375,737.156005859375 266,737.156005859375 C212,737.156005859375 178,696.1920166015625 157,602.1610107421875 C134,498.82000732421875 117,380.239990234375 74,0 L78.21453094482422,37.160953521728516 C100.22924041748047,230.68260192871094 184,372 291,372 C355,372 395.6745910644531,321 384.1253967285156,248 C377.6238098144531,205 370.0873107910156,161 361.3063049316406,110 C351.0714111328125,46 380.3254089355469,-4 468.96173095703125,-4 C598.2246704101562,-4 739.2435302734375,67.83381652832031 811.4124145507812,179.0941619873047 C836,217 846,251 847,284 C848,344 814,389 754,389 C678,389 620,303 620,193 C620,75 684,-8 819.9180908203125,-8 C1004.7244873046875,-8 1209.4246826171875,213.84754943847656 1303.4808349609375,461.42327880859375 C1330.037353515625,531.3258056640625 1340,596.2349243164062 1340,641.593994140625 C1340,695.3764038085938 1323,736.673583984375 1275,736.673583984375 C1228,736.673583984375 1197,700.1784057617188 1169,642.5543823242188 C1136.1939697265625,575.7216186523438 1111.927734375,479.32598876953125 1102,370.3599853515625 C1077,96.94000244140625 1133,-4 1266.152099609375,-4 C1427.6083984375,-4 1607.1151123046875,220.92921447753906 1698.771728515625,462.18878173828125 C1725.037353515625,531.3258056640625 1735,596.2349243164062 1735,641.593994140625 C1735,695.3764038085938 1718,736.673583984375 1670,736.673583984375 C1623,736.673583984375 1592,700.1784057617188 1564,642.5543823242188 C1531.1939697265625,575.7216186523438 1506.927734375,479.32598876953125 1497,370.3599853515625 C1472,96.94000244140625 1528,-4 1646.906005859375,-4 C1765.623779296875,-4 1830.114990234375,99.48485565185547 1868.77880859375,209.3712158203125 C1907,318 1954,385 2052,385 C2133,385 2197,325 2197,212 C2197,87 2115.90087890625,-7 2013.41845703125,-8 C1923.234130859375,-9 1864,64 1870,174 C1877,296 1951,385 2048,385 C2104,385 2151.03564453125,360.1071472167969 2188,333 C2288.21435546875,259.8928527832031 2365.4287109375,305.0714416503906 2395,377.3571472167969';

function Loader() {
  const [lenis, introOut, setIntroOut, setIsLoading, setIsAbout] = useStore(
    useShallow((state) => [
      state.lenis,
      state.introOut,
      state.setIntroOut,
      state.setIsLoading,
      state.setIsAbout,
    ]),
  );

  const progressRef = useRef(null);
  const pathRef = useRef(null);
  const helloContainerRef = useRef(null);
  const root = useRef(null);
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    let ctx;
    if (!introOut) {
      setIsAbout(router.asPath === '/about');

      ctx = gsap.context(() => {
        const p = pathRef.current;
        const totalLen = p ? p.getTotalLength() : 10400;

        if (p) {
          gsap.set(p, {
            strokeDasharray: totalLen + 2,
            strokeDashoffset: totalLen + 2,
            opacity: 0,
          });
        }

        // Apple signature handwriting animation (single continuous stroke, no stray dots)
        const writeTl = gsap.timeline();
        if (p) {
          writeTl
            .set(p, { opacity: 1 })
            .to(p, {
              strokeDashoffset: 0,
              duration: 2.7,
              ease: 'power1.inOut',
            });
        }

        // Numeric progress counter
        gsap.to(progressRef.current, {
          duration: 3.2,
          ease: 'power2.inOut',
          innerText: `${100}%`,
          roundProps: 'innerText',
          snap: {
            innerText: 1,
          },
          onComplete: () => {
            gsap.set('header', {
              autoAlpha: 0,
              ease: 'power2.inOut',
            });

            // Fade out the numeric counter only; keep the hello graphic fully intact
            if (progressRef.current) {
              gsap.to(progressRef.current, {
                opacity: 0,
                duration: 0.35,
                ease: 'power2.out',
              });
            }

            lenis?.scrollTo(0, { force: true });
            gsap.set(document?.getElementById('layout'), {
              height: '90%',
            });

            gsap.set('main', {
              x: '100%',
              scale: 0.9,
              opacity: 1,
              border: '2px solid #f0f4f1',
              borderRadius: '1.3888888889vw',
            });

            // Loader panel scales and slides out holding the intact "hello"
            gsap.to(root.current, {
              scale: 0.9,
              ease: 'power2.inOut',
              delay: 0.3,
              duration: 0.5,
              borderRadius: '1.3888888889vw',
            });
            gsap.to(root.current, {
              ease: 'power2.inOut',
              delay: 0.8,
              duration: 0.55,
              x: '-100%',
            });

            gsap.to('main', {
              ease: 'power2.inOut',
              delay: 0.8,
              duration: 0.55,
              x: '0px',
            });
            gsap.to('main', {
              ease: 'power2.inOut',
              delay: 1.35,
              duration: 0.5,
              scale: 1,
              borderRadius: 0,
            });
            gsap.to(document?.getElementById('layout'), {
              ease: 'power2.inOut',
              delay: 1.35,
              duration: 0.5,
              height: '100%',
            });
            gsap.to('header', {
              delay: 1.45,
              duration: 0.5,
              ease: 'power2.inOut',
              autoAlpha: 1,
            });
            gsap.to('main', {
              ease: 'power2.inOut',
              delay: 1.7,
              duration: 0.5,
              height: 'auto',
              border: 'none',
              pointerEvents: 'auto',
              onComplete: () => {
                setIntroOut(true);
                setIsLoading(false);
                lenis?.start();
              },
            });
          },
        });
      });
    } else if (ctx) {
      ctx.kill();
    }

    return () => {
      if (ctx) {
        ctx.kill();
      }
    };
  }, [lenis, introOut]);

  return (
    <div
      id="loader"
      ref={root}
      className={clsx(styles.root, 'layout-block-inner')}
    >
      <div className={styles.innerContainer}>
        <div ref={helloContainerRef} className={styles.helloContainer}>
          <svg
            className={styles.helloSvg}
            viewBox="-109.06069946289062 -9 2504.0606994628906 746.156005859375"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Apple Hello"
          >
            <g transform="scale(1, -1) translate(0, -728.156005859375)">
              <path ref={pathRef} d={HELLO_PATH_D} />
            </g>
          </svg>
        </div>

        {!introOut && (
          <div className={styles.progressContainer}>
            <h1 ref={progressRef} className={clsx(styles.progress, 'h1')}>
              0%
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loader;
