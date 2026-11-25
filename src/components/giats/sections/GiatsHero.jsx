import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FloatingMeshes } from "../canvas/FloatingMeshes";

const moveRect = (rect, direction, gridWidth, gridHeight) => {
  const moveMap = {
    left: () => {
      rect.x = `${(parseFloat(rect.x) - gridWidth).toFixed(2)}%`;
    },
    right: () => {
      rect.x = `${(parseFloat(rect.x) + gridWidth).toFixed(2)}%`;
    },
    up: () => {
      rect.y = `${(parseFloat(rect.y) - gridHeight).toFixed(2)}%`;
    },
    down: () => {
      rect.y = `${(parseFloat(rect.y) + gridHeight).toFixed(2)}%`;
    },
  };
  moveMap[direction]?.();
};

const arePositionsEqual = (pos1, pos2) => pos1.x === pos2.x && pos1.y === pos2.y;
const isPositionOccupied = (rects, pos) => rects.some((rect) => arePositionsEqual(rect, pos));

const performMoves = (rectangles, gridWidth, gridHeight) => {
  const totalGroups = Math.floor(Math.random() * 4) + 1;
  const allMovements = [];

  for (let i = 0; i < totalGroups; i++) {
    const validMoves = [];
    const randomRectIndex = Math.floor(Math.random() * rectangles.length);
    const rect = { ...rectangles[randomRectIndex] };
    const originalPosition = { ...rectangles[randomRectIndex] };
    let validMove = false;

    ["left", "right", "up", "down"].forEach((direction) => {
      if (validMove) return;
      moveRect(rect, direction, gridWidth, gridHeight);
      const newPosition = { ...rect };
      const { x, y } = { x: parseFloat(newPosition.x), y: parseFloat(newPosition.y) };
      if (x >= 0 && x <= 80 && y >= 0 && y <= 60 && !isPositionOccupied(rectangles, newPosition)) {
        validMove = true;
        validMoves.push({ index: newPosition.index, x: newPosition.x, y: newPosition.y });
        Object.assign(rectangles[newPosition.index], newPosition);
      } else {
        Object.assign(rect, originalPosition);
      }
    });

    if (validMoves.length > 0) allMovements.push(validMoves);
  }

  return allMovements;
};

export const GiatsHero = () => {
  const [isMaskHovered, setIsMaskHovered] = useState(false);
  const [rectangles, setRectangles] = useState([
    { index: 0, x: "0.00%", y: "50.00%" },
    { index: 1, x: "16.67%", y: "0.00%" },
    { index: 2, x: "33.34%", y: "0.00%" },
    { index: 3, x: "50.01%", y: "0.00%" },
    { index: 4, x: "66.68%", y: "50.00%" },
    { index: 5, x: "83.35%", y: "50.00%" },
    { index: 6, x: "33.34%", y: "50.00%" },
  ]);

  const gridWidth = 16.67;
  const gridHeight = 50.0;

  // Move tiles periodically for the architectural window effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRectangles((prev) => {
        const copy = prev.map((r) => ({ ...r }));
        performMoves(copy, gridWidth, gridHeight);
        return copy;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-12 z-10"
      style={{
        boxShadow: "inset 0 0 0 24px #f0f4f1",
      }}
    >
      {/* Top Editorial Headline Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-16 gap-6 items-end py-4">
        <div className="lg:col-span-10">
          <p className="text-xs sm:text-sm font-mono tracking-widest text-[#28282b]/60 uppercase mb-1">
            Software Engineering Portfolio · 2026
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#28282b] leading-[1.08]">
            Remarkable
          </h1>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#28282b] leading-[1.08]">
            System Architecture.
          </h2>
        </div>
        <div className="lg:col-span-6">
          <p className="text-sm sm:text-base font-normal text-[#28282b]/80 leading-relaxed">
            Software Engineering Student at <strong className="font-semibold text-[#28282b]">University of Greenwich</strong> · Top 3 Student 2024. Engineering reliable full-stack applications, scalable distributed backends, and award-winning 3D web experiences.
          </p>
        </div>
      </div>

      {/* The Signature Giats "Window" Cut-out with 3D Floating Meshes */}
      <div
        className="relative w-full max-w-7xl mx-auto my-4 flex-1 min-h-[380px] sm:min-h-[460px] rounded-3xl overflow-hidden border-2 border-[#28282b]/10 bg-transparent shadow-2xl transition-all duration-700"
        onMouseEnter={() => setIsMaskHovered(true)}
        onMouseLeave={() => setIsMaskHovered(false)}
      >
        {/* The 3D Kinetic Scene inside the window */}
        <div className="absolute inset-0 w-full h-full z-0">
          <FloatingMeshes />
        </div>

        {/* Dynamic Architectural SVG Cutout Mask */}
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 z-10 ${
            isMaskHovered ? "opacity-15" : "opacity-100"
          }`}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <mask id="hero-window-mask">
                {/* White shows content, black cuts hole */}
                <rect x="0" y="0" width="100" height="100" fill="white" />
                {rectangles.map((r, i) => (
                  <rect
                    key={i}
                    x={r.x}
                    y={r.y}
                    width={`${gridWidth}%`}
                    height={`${gridHeight}%`}
                    fill="black"
                    rx="1.5"
                    className="transition-all duration-1000 ease-in-out"
                  />
                ))}
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="#f0f4f1"
              mask="url(#hero-window-mask)"
            />
          </svg>
        </div>

        {/* Floating Hint Overlay on hover */}
        <div className="absolute bottom-4 right-5 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono tracking-wider border border-white/10">
            Interactive 3D Canvas • Move Cursor
          </span>
        </div>
      </div>

      {/* Bottom Infinite Marquee Ticker */}
      <div className="w-full max-w-7xl mx-auto overflow-hidden border-t border-[#28282b]/15 pt-3">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-xs sm:text-sm uppercase tracking-widest text-[#28282b]/60">
          <span className="mx-6">✦ SCROLL DOWN</span>
          <span className="mx-6">✦ EXPLORE ENGINEERING PROJECTS</span>
          <span className="mx-6">✦ UNIVERSITY OF GREENWICH</span>
          <span className="mx-6">✦ TOP 3 STUDENT 2024</span>
          <span className="mx-6">✦ BEST STUDENT COMP1643 2026</span>
          <span className="mx-6">✦ SCROLL DOWN</span>
          <span className="mx-6">✦ EXPLORE ENGINEERING PROJECTS</span>
          <span className="mx-6">✦ UNIVERSITY OF GREENWICH</span>
          <span className="mx-6">✦ TOP 3 STUDENT 2024</span>
          <span className="mx-6">✦ BEST STUDENT COMP1643 2026</span>
        </div>
      </div>
    </section>
  );
};

export default GiatsHero;
