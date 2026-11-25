import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export const GiatsQuote = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const split = new SplitType(textRef.current, { types: "words" });

    gsap.fromTo(
      split.words,
      { opacity: 0.15, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      }
    );

    return () => {
      split.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 sm:py-44 px-6 sm:px-12 bg-[#f0f4f1] text-[#28282b] flex items-center justify-center z-10"
    >
      <div className="w-full max-w-5xl mx-auto text-center">
        <p className="text-xs sm:text-sm font-mono tracking-widest text-[#28282b]/50 uppercase mb-8">
          Architectural Mindset
        </p>
        <h3
          ref={textRef}
          className="text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.35] tracking-tight text-[#28282b]"
        >
          “When architecting scalable distributed applications, choosing the right foundations is paramount. I combine resilient software principles, clean architecture, and modern interfaces to turn ambitious visions into robust production systems.”
        </h3>
        <p className="mt-8 text-xs font-mono text-[#28282b]/40 uppercase tracking-widest">
          — Nguyen Van Duc · Da Nang, Vietnam
        </p>
      </div>
    </section>
  );
};

export default GiatsQuote;
