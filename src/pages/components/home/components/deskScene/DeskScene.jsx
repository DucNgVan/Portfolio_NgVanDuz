import { useEffect, useRef, useState } from "react";

/**
 * DeskScene – bàn học dạng line-art (nét thẳng, gọn) với đèn học kéo dây để đổi light / dark mode.
 *
 * Cách dùng:
 *   <div style={{ height: 470 }}>          // đặt vào đúng khung của các ô vuông cũ
 *     <DeskScene onThemeChange={(t) => console.log(t)} />
 *   </div>
 *
 * Props:
 *   defaultTheme   "light" | "dark"          (mặc định "light")
 *   onThemeChange  (theme) => void            gọi mỗi khi giật dây đèn
 *   syncDocument   boolean                    true: set <html data-theme="light|dark"> (mặc định true)
 *
 * Toàn bộ site có thể đọc theme qua CSS:  [data-theme="dark"] { ... }
 */

const CHAIN_X = 706;
const PULL_MAX = 44;
const PULL_TRIGGER = 16;

export default function DeskScene({
  defaultTheme = "light",
  onThemeChange,
  syncDocument = true,
}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef(null);
  const drag = useRef({ startY: 0, scale: 1, moved: 0 });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      if (syncDocument) {
        document.documentElement.setAttribute("data-theme", saved);
      }
      onThemeChange?.(saved);
    }
  }, [syncDocument]);

  useEffect(() => {
    if (mounted && syncDocument) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted, syncDocument]);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      onThemeChange?.(next);
      return next;
    });
  };

  const onDown = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    // quy đổi px màn hình -> đơn vị viewBox (900 rộng)
    drag.current = { startY: e.clientY, scale: 900 / rect.width, moved: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onMove = (e) => {
    if (!dragging) return;
    const dy = (e.clientY - drag.current.startY) * drag.current.scale;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dy));
    setPull(Math.min(PULL_MAX, Math.max(0, dy)));
  };
  const onUp = () => {
    if (!dragging) return;
    // kéo đủ sâu, hoặc chỉ bấm nhẹ đều tính là giật dây
    if (pull > PULL_TRIGGER || drag.current.moved < 4) toggle();
    setDragging(false);
    setPull(0);
  };
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setPull(PULL_TRIGGER + 6);
      toggle();
      setTimeout(() => setPull(0), 120);
    }
  };

  return (
    <div
      className="dsk"
      data-theme={mounted ? theme : defaultTheme}
      suppressHydrationWarning
    >
      <svg
        ref={svgRef}
        viewBox="0 0 900 430"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label="Desk with computer and lamp. Pull the lamp cord to toggle light or dark theme."
      >
        <defs>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd98a" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0.03" />
          </linearGradient>
          <clipPath id="screenClip">
            <rect x="264" y="110" width="262" height="146" rx="4" />
          </clipPath>
        </defs>

        {/* chùm sáng của đèn (chỉ hiện ở dark mode) */}
        <polygon className="beam" points="668,184 752,200 800,334 470,334" fill="url(#beamGrad)" />

        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* ===== BÀN ===== */}
          <path className="paper" d="M40 332 H860 V346 H40 Z" />
          <path d="M88 346 V424 M812 346 V424 M88 392 H812" />

          {/* sách */}
          <rect className="paper" x="62" y="304" width="96" height="28" />
          <path d="M62 318 H158" strokeWidth="1.6" />
          <rect className="paper" x="72" y="278" width="80" height="26" />
          <path d="M82 291 H130" strokeWidth="1.6" />
          <rect className="paper" x="68" y="254" width="70" height="24" />
          <path d="M78 266 H116" strokeWidth="1.6" />

          {/* cốc cà phê */}
          <path className="paper" d="M178 296 H214 L210 332 H182 Z" style={{ stroke: "var(--cup)" }} />
          <path d="M213 304 H224 V320 H212" style={{ stroke: "var(--cup)" }} />
          <path className="steam" d="M192 286 V268 M203 286 V268" strokeWidth="1.8" />

          {/* ===== MÀN HÌNH ===== */}
          <path d="M386 268 V304 M404 268 V304" />
          <path className="paper" d="M346 306 H444 L436 322 H354 Z" />
          <rect className="paper" x="250" y="96" width="290" height="174" rx="10" />
          <rect className="screen" x="264" y="110" width="262" height="146" rx="4" />
          {/* code trên màn hình */}
          <g className="code-text" clipPath="url(#screenClip)">
            <text x="274" y="132"><tspan className="tag">{"<DucNgVan>"}</tspan></text>
            <text x="282" y="152">
              <tspan className="tag">{"<h1>"}</tspan>Software Engineering<tspan className="tag">{"</h1>"}</tspan>
            </text>
            <text x="282" y="172">
              <tspan className="dim">{"{"}</tspan>projects.map(p <tspan className="tag">{"=>"}</tspan>
            </text>
            <text x="294" y="192">
              <tspan className="tag">{"<Project"}</tspan> key=<tspan className="dim">{"{p}"}</tspan> <tspan className="tag">{"/>"}</tspan>
            </text>
            <text x="282" y="212"><tspan className="dim">{")}"}</tspan></text>
            <text x="274" y="232"><tspan className="tag">{"</DucNgVan>"}</tspan></text>
            <text x="274" y="248" className="dim">{"// ready for internship"}</text>
            <rect className="caret cursor" x="424" y="238" width="7" height="12" />
          </g>

          {/* bàn phím + chuột */}
          <path className="paper" d="M276 316 H474 L482 332 H268 Z" />
          <path d="M290 322 H462 M286 327 H466" strokeWidth="1.4" />
          <rect className="paper" x="506" y="316" width="22" height="14" rx="7" />

          {/* ===== THÂN MÁY TÍNH ===== */}
          <rect className="paper" x="574" y="168" width="78" height="164" rx="6" />
          <path d="M588 190 H638 M588 200 H638 M588 210 H638 M588 220 H638" strokeWidth="1.6" />
          <circle cx="613" cy="290" r="9" />
          <circle cx="613" cy="290" r="2.5" className="bulb" style={{ fill: "var(--accent)" }} />
          <path d="M588 312 H638" strokeWidth="1.6" />

          {/* ===== ĐÈN HỌC ===== */}
          <ellipse className="paper" cx="800" cy="330" rx="42" ry="7" />
          <path d="M800 324 L782 244 L742 146" />
          <circle className="paper" cx="782" cy="244" r="5" />
          <circle className="paper" cx="742" cy="146" r="6" />

          {/* dây kéo (vẽ trước chụp đèn để chụp che phần đầu dây) */}
          <g
            className={`chain${dragging ? " dragging" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Pull lamp cord to toggle light or dark theme"
            aria-pressed={mounted ? theme === "dark" : false}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onKey}
          >
            <g className="chain-move" style={{ transform: `translateY(${pull}px)` }}>
              <line x1={CHAIN_X} y1="130" x2={CHAIN_X} y2="258" strokeWidth="1.6" />
              <circle className="bead paper" cx={CHAIN_X} cy="266" r="7" />
              {/* vùng bấm rộng hơn cho dễ nắm */}
              <rect x={CHAIN_X - 18} y="200" width="36" height="86" fill="transparent" stroke="none" />
            </g>
          </g>

          {/* chụp đèn + bóng */}
          <path className="paper" d="M664 182 L722 128 L756 198 Z" />
          <circle className="bulb" cx="710" cy="196" r="6" strokeWidth="2" />
        </g>

        {/* quầng sáng quanh bóng đèn khi bật */}
        <circle className="beam" cx="710" cy="196" r="34" fill="#ffd98a" opacity=".25" />
      </svg>

      <span className="hint" aria-hidden="true" suppressHydrationWarning>
        {mounted && theme === "dark" ? "Pull cord to turn off light" : "Pull cord to turn on light"}
      </span>
    </div>
  );
}
