import React from 'react';

export const ReactIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

export const NextjsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 180 180" fill="none" {...props}>
    <mask id="mask-next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#mask-next)">
      <circle cx="90" cy="90" r="90" fill="#0D0D0D" stroke="#333333" strokeWidth="6" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_next)"
      />
      <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
    </g>
    <defs>
      <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear_next" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export const TypescriptIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <rect width="256" height="256" rx="40" fill="#3178C6"/>
    <path d="M150.7 131.7h23.6v-21.3h-74v21.3h23.7V208h26.7v-76.3z" fill="#FFFFFF"/>
    <path d="M194.2 195.4c8.4 5.3 19 8.6 30 8.6 15.6 0 24.2-7.5 24.2-18.7 0-11-7.7-16.7-22.1-22.7-18.5-7.7-30.2-18.7-30.2-35.8 0-20 16-35.1 40.5-35.1 12.1 0 21.6 3 28.5 7.1l-6.8 19.3c-6-3.4-13.8-5.7-21.7-5.7-13.2 0-20.1 6.8-20.1 15.6 0 9.8 7.3 14.7 22.3 21 19.5 8.1 30.2 18.7 30.2 36.6 0 20.8-16.4 36.6-43.7 36.6-14.3 0-26.6-4.2-34.9-9.5l6.8-19.4z" fill="#FFFFFF"/>
  </svg>
);

export const JavascriptIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <rect width="256" height="256" rx="40" fill="#F7DF1E"/>
    <path d="M67 215c-15.6-9.1-23.4-23.7-23.4-43.9h27.4c.5 12.5 5.5 19.8 15.2 21.8 10.3 2.1 20.3-2.6 20.3-15.6 0-11.5-6.8-16.1-22.4-22.9-24.5-10.9-40.1-23.4-40.1-49 0-24.5 18.2-43.2 45.3-43.2 24.5 0 39.6 10.9 45.8 29.7l-24.5 10.4c-3.6-11.5-10.4-16.7-21.4-16.7-10.4 0-17.7 5.7-17.7 14.1 0 8.3 5.2 12.5 19.8 18.8 27.6 12 42.7 23.4 42.7 51.6 0 29.2-22.9 47.9-52.1 47.9-14.6 0-26.1-3.6-32.8-8.1zM149.2 216c-13-8.3-19.3-21.4-19.3-39.6h27.6c.5 12 5.2 18.8 14.1 20.8 9.4 2.1 19.8-1.6 19.8-13.5 0-9.9-6.2-14.6-20.8-20.8-24-10.4-38.5-22.9-38.5-47.9 0-25 18.2-42.7 44.8-42.7 23.4 0 37.5 9.9 43.7 28.1l-24.5 10.4c-3.6-10.9-9.9-15.1-19.8-15.1-9.9 0-17.2 5.7-17.2 13.5 0 8.3 5.7 12 18.8 17.7 27.1 11.5 41.7 22.9 41.7 51 0 30.7-22.9 47.9-52.1 47.9-13.6 0-25.5-3.6-32.3-8.8z" fill="#000000" transform="translate(15, -5)"/>
  </svg>
);

export const TailwindIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 154" fill="none" {...props}>
    <path
      d="M128 0C93.867 0 72.533 17.067 64 51.2c12.8-17.067 27.733-23.467 44.8-19.2 9.739 2.435 16.7 9.493 24.4 17.307C145.733 62.08 160.533 77.067 192 77.067c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.739-2.435-16.7-9.493-24.4-17.307C174.267 14.987 159.467 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.739 2.435 16.7 9.493 24.4 17.307C81.733 138.88 96.533 153.867 128 153.867c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.739-2.435-16.7-9.493-24.4-17.307C110.267 91.787 95.467 76.8 64 76.8z"
      fill="#38BDF8"
    />
  </svg>
);

export const ThreejsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="round" {...props}>
    <polygon points="128,24 232,208 24,208" fill="#111111" stroke="#8C6D3F" strokeWidth="14" />
    <line x1="128" y1="24" x2="128" y2="148" stroke="#8C6D3F" strokeWidth="10" />
    <line x1="24" y1="208" x2="128" y2="148" stroke="#8C6D3F" strokeWidth="10" />
    <line x1="232" y1="208" x2="128" y2="148" stroke="#8C6D3F" strokeWidth="10" />
    <circle cx="128" cy="148" r="8" fill="#8C6D3F" />
  </svg>
);

export const VueIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 261 226" fill="none" {...props}>
    <path d="M161.096.001l-30.225 52.351L100.647.001H0l130.871 226.002L261.742.001h-100.646z" fill="#42B883"/>
    <path d="M161.096.001l-30.225 52.351L100.647.001H52.846l78.025 134.908L208.897.001h-47.801z" fill="#35495E"/>
  </svg>
);

export const NodejsIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 280" fill="none" {...props}>
    <path d="M128 0L247 69.1V209.6L128 280L9 209.6V69.1L128 0Z" fill="#339933"/>
    <path d="M128 14.5L234.5 76V199.5L128 261L21.5 199.5V76L128 14.5Z" fill="#026E00" opacity="0.3"/>
    <path d="M128 50L190 85V155L128 190L66 155V85L128 50Z" fill="#FFFFFF"/>
  </svg>
);

export const ExpressIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <rect width="256" height="256" rx="40" fill="#181818"/>
    <text x="128" y="162" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontSize="100" fontWeight="900" letterSpacing="-2">
      ex
    </text>
  </svg>
);

export const PostgresIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <circle cx="128" cy="128" r="120" fill="#336791"/>
    <path d="M128 50c-35 0-60 20-60 55 0 25 12 40 25 50v45h30v-25h10v25h30v-45c13-10 25-25 25-50 0-35-25-55-60-55z" fill="#FFFFFF"/>
    <circle cx="105" cy="95" r="7" fill="#336791"/>
    <circle cx="151" cy="95" r="7" fill="#336791"/>
    <path d="M110 130c10 8 26 8 36 0" stroke="#336791" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

export const MongodbIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 550" fill="none" {...props}>
    <path d="M127.5 0C127.5 0 13.5 174 13.5 330.5C13.5 442.5 86.5 528 123.5 549C126.5 550.5 127.5 550.5 127.5 550.5V0Z" fill="#13AA52"/>
    <path d="M128.5 0C128.5 0 242.5 174 242.5 330.5C242.5 442.5 169.5 528 132.5 549C129.5 550.5 128.5 550.5 128.5 550.5V0Z" fill="#00ED64"/>
    <path d="M128 550C125 550 120 480 120 420C120 350 128 300 128 300C128 300 136 350 136 420C136 480 131 550 128 550Z" fill="#116149"/>
  </svg>
);

export const RedisIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <rect width="256" height="256" rx="40" fill="#DC382D"/>
    <path d="M50 100L128 60L206 100L128 140L50 100Z" fill="#FFFFFF"/>
    <path d="M50 120L128 160L206 120V145L128 185L50 145V120Z" fill="#FFFFFF" opacity="0.9"/>
    <path d="M50 165L128 205L206 165V190L128 230L50 190V165Z" fill="#FFFFFF" opacity="0.8"/>
  </svg>
);

export const JavaIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <circle cx="128" cy="128" r="120" fill="#EA2D2E"/>
    <path d="M100 80c-20 25 15 40 5 60-5 10-15 15-20 20 20-5 35-15 35-30 0-25-30-35-20-50z" fill="#FFFFFF"/>
    <path d="M135 60c-15 20 10 35 5 50-5 10-15 15-20 20 18-5 30-15 30-25 0-20-22-30-15-45z" fill="#FFFFFF" opacity="0.8"/>
    <path d="M70 185c40 15 80 15 120 0-10 10-40 18-60 18-20 0-50-8-60-18z" fill="#FFFFFF"/>
  </svg>
);

export const GitIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <path d="M251.5 117.8L138.2 4.5c-6-6-15.7-6-21.7 0L95.2 25.8l27.3 27.3c6.4-2.2 13.8-.8 19 4.4 5.2 5.2 6.6 12.6 4.4 19l26.3 26.3c6.4-2.2 13.8-.8 19 4.4 7.4 7.4 7.4 19.5 0 26.9-7.4 7.4-19.5 7.4-26.9 0-5.4-5.4-6.7-13.1-4-19.6L135.5 89.7v55.8c2 .9 3.8 2.2 5.4 3.8 7.4 7.4 7.4 19.5 0 26.9-7.4 7.4-19.5 7.4-26.9 0-7.4-7.4-7.4-19.5 0-26.9 2-2 4.4-3.4 7-4.2V89.4c-2.6-.8-5-2.2-7-4.2-5.4-5.4-6.7-13.1-4-19.6L82.7 38.3 4.5 116.5c-6 6-6 15.7 0 21.7l113.3 113.3c6 6 15.7 6 21.7 0l112-112c6-6 6-15.7 0-21.7z" fill="#F05032"/>
  </svg>
);

export const DockerIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <circle cx="128" cy="128" r="120" fill="#2496ED"/>
    <path d="M195 125c-2-12-10-18-20-18-2 0-4 .2-6 .7 0-15-12-25-27-25-2 0-4 .2-6 .5V75h-16v18H104V75H88v18H72v16h88c1 0 2 .1 3 .3 6 1 11 6 12 12 .5 2 .7 4 .7 6.7 0 3-.5 6-1.5 8.7-2 5-6 9-11 11.3H60c-2 0-4-.5-5.5-1.5-6-4-8-11-8-18.5H30c0 14 5 26 14 34 10 9 23 13 38 13 35 0 68-15 88-42 9 0 17-3 23-10 3-4 5-8 6-13-1 .2-2 .5-4 .5z" fill="#FFFFFF"/>
    <rect x="72" y="93" width="16" height="15" rx="2" fill="#FFFFFF"/>
    <rect x="88" y="93" width="16" height="15" rx="2" fill="#FFFFFF"/>
    <rect x="104" y="93" width="16" height="15" rx="2" fill="#FFFFFF"/>
    <rect x="120" y="93" width="16" height="15" rx="2" fill="#FFFFFF"/>
  </svg>
);

export const PostmanIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none" {...props}>
    <circle cx="128" cy="128" r="120" fill="#FF6C37"/>
    <path d="M128 55c-40 0-73 33-73 73s33 73 73 73 73-33 73-73-33-73-73-73zm32 63l-28 28c-2 2-5 3-8 3s-6-1-8-3l-14-14c-4-4-4-11 0-15s11-4 15 0l6 6 21-21c4-4 11-4 15 0s5 12 1 16z" fill="#FFFFFF"/>
  </svg>
);

export const FirebaseIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg className={className} viewBox="0 0 256 354" fill="none" {...props}>
    <path d="M3.5 277.5L88 114.5c4-7.5 15-8 19-1l41 77-144.5 87z" fill="#FFA000"/>
    <path d="M174.5 45c-4.5-8-16-7.5-20 1L3.5 277.5l121.5 68.5c7 4 15.5 4 22.5 0l105-59L174.5 45z" fill="#F57C00"/>
    <path d="M148 190.5L107 113.5c-4-7-15-6.5-19 1L3.5 277.5 128 347.5l20-157z" fill="#FFCA28"/>
  </svg>
);

export const getTechIcon = (name) => {
  const lower = (name || '').toLowerCase();
  if (lower.includes('react') || lower.includes('next')) return NextjsIcon;
  if (lower.includes('typescript')) return TypescriptIcon;
  if (lower.includes('javascript')) return JavascriptIcon;
  if (lower.includes('tailwind')) return TailwindIcon;
  if (lower.includes('three')) return ThreejsIcon;
  if (lower.includes('vue')) return VueIcon;
  if (lower.includes('node') || lower.includes('express')) return NodejsIcon;
  if (lower.includes('postgres') || lower.includes('sql')) return PostgresIcon;
  if (lower.includes('mongo')) return MongodbIcon;
  if (lower.includes('redis')) return RedisIcon;
  if (lower.includes('java') || lower.includes('android')) return JavaIcon;
  if (lower.includes('git')) return GitIcon;
  if (lower.includes('docker')) return DockerIcon;
  if (lower.includes('postman')) return PostmanIcon;
  if (lower.includes('firebase')) return FirebaseIcon;
  return null;
};
