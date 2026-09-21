/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#EDE5DC',
          300: '#E2D5BD',
          400: '#D8C8A8',
          DEFAULT: '#F4EFEA',
        },
        sand: {
          gold: '#D8C8A8',
          light: '#E5DEC9',
          dark: '#BFA882',
        },
        charcoal: {
          950: '#060606',
          900: '#0D0D0D',
          800: '#151515',
          700: '#222222',
          600: '#333333',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Anton', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        syne: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 18s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
