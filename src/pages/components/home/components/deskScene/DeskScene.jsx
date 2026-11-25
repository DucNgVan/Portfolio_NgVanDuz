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

const css = `
.dsk{
  --bg:#eef2ee; --ink:#1f2326; --accent:#d9471f; --screen:#f7faf6;
  --glow:rgba(255,205,120,0); --cup:#d9471f;
  position:relative; width:100%; height:100%; min-height:260px;
  display:flex; align-items:flex-end; justify-content:center;
  background:var(--bg); color:var(--ink); border-radius:var(--layout-columns-gap, 24px); overflow:hidden;
  transition:background .7s ease, color .7s ease; user-select:none; -webkit-user-select:none;
}
.dsk[data-theme="dark"]{
  --bg:#0f0f14; --ink:#e9ece6; --accent:#ff6a3d; --screen:#1a1a22;
  --glow:rgba(255,205,120,1); --cup:#ff6a3d;
}
.dsk svg{ width:100%; height:100%; display:block; overflow:visible; }
.dsk .beam{ opacity:0; transition:opacity .6s ease; }
.dsk[data-theme="dark"] .beam{ opacity:1; }
.dsk .bulb{ fill:var(--bg); transition:fill .4s ease; }
.dsk[data-theme="dark"] .bulb{ fill:#ffe3a0; }
.dsk .screen{ fill:var(--screen); transition:fill .7s ease; }
.dsk .code-text{
  font:500 14px ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  fill:var(--ink); stroke:none; opacity:.85; transition:fill .7s ease;
}
.dsk .code-text .tag{ fill:var(--accent); }
.dsk .code-text .dim{ opacity:.55; }
.dsk .caret{ fill:var(--accent); stroke:none; }
.dsk .paper{ fill:var(--bg); transition:fill .7s ease; }
.dsk .chain{ cursor:grab; touch-action:none; outline:none; }
.dsk .chain.dragging{ cursor:grabbing; }
.dsk .chain-move{ transition:transform .55s cubic-bezier(.25,1.9,.45,.8); }
.dsk .chain.dragging .chain-move{ transition:none; }
.dsk .chain:focus-visible .bead{ stroke:var(--accent); stroke-width:3.5; }
.dsk .cursor{ animation:dskBlink 1s steps(1) infinite; }
.dsk .steam{ stroke-dasharray:4 7; animation:dskSteam 2.4s linear infinite; }
.dsk .hint{
  position:absolute; right:clamp(12px,6%,70px); bottom:14px; font:600 13px/1 system-ui,sans-serif;
  color:var(--ink); opacity:.55; pointer-events:none;
}
@keyframes dskBlink{ 50%{ opacity:0 } }
@keyframes dskSteam{ to{ stroke-dashoffset:-22 } }
@media (prefers-reduced-motion:reduce){
  .dsk .cursor,.dsk .steam{ animation:none } .dsk .chain-move{ transition:none }
}
`;

export default function DeskScene({
  defaultTheme = "light",
  onThemeChange,
  syncDocument = true,
}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef(null);
  const drag = useRef({ startY: 0, scale: 1, moved: 0 });

  useEffect(() => {
    if (syncDocument) document.documentElement.setAttribute("data-theme", theme);
  }, [theme, syncDocument]);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
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
    <div className="dsk" data-theme={theme}>
      <style>{css}</style>

      <svg
        ref={svgRef}
        viewBox="0 0 900 430"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label="Bàn học có máy tính và đèn học. Kéo dây đèn để đổi giao diện sáng hoặc tối."
      >
        <defs>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd98a" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0.03" />
          </linearGradient>
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
          <g className="code-text">
            <text x="280" y="130"><tspan className="tag">{"<DucNgVan>"}</tspan></text>
            <text x="296" y="151">
              <tspan className="tag">{"<h1>"}</tspan>Software Engineering<tspan className="tag">{"</h1>"}</tspan>
            </text>
            <text x="296" y="172">
              <tspan className="dim">{"{"}</tspan>projects.map(p <tspan className="tag">{"=>"}</tspan>
            </text>
            <text x="312" y="193">
              <tspan className="tag">{"<Project"}</tspan> key=<tspan className="dim">{"{p.id}"}</tspan> <tspan className="tag">{"/>"}</tspan>
            </text>
            <text x="296" y="214"><tspan className="dim">{")}"}</tspan></text>
            <text x="280" y="235"><tspan className="tag">{"</DucNgVan>"}</tspan></text>
            <text x="280" y="252" className="dim">{"// ready for internship"}</text>
            <rect className="caret cursor" x="364" y="223" width="8" height="15" />
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
            aria-label="Giật dây đèn để đổi chế độ sáng / tối"
            aria-pressed={theme === "dark"}
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

      <span className="hint" aria-hidden="true">
        {theme === "light" ? "Kéo dây để bật đèn" : "Kéo dây để tắt đèn"}
      </span>
    </div>
  );
}
