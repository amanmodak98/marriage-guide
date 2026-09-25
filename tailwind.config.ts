import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#8B1E3F',
        'crimson-deep': '#5C1126',
        terracotta: '#B23A48',
        vermilion: '#C75146',
        rose: '#E8927C',
        alabaster: '#FAF7F2',
        ivory: '#F5EFE6',
        parchment: '#EDE5D8',
        gold: '#C9A961',
        'gold-bright': '#E8C77C',
        'gold-dark': '#8B6F3A',
        ink: '#2B1810',
        'ink-soft': '#5C3A2E',
        'ink-mute': '#8B6F5E',
        emerald: '#1F4F3F',
        'emerald-light': '#3A7A60',
        lapis: '#1E3A5F',
        'lapis-light': '#3A6BAA',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
        italiana: ['var(--font-italiana)', 'serif'],
      },
      boxShadow: {
        'polaroid': '0 10px 30px -10px rgba(43, 24, 16, 0.35), 0 4px 12px -4px rgba(43, 24, 16, 0.15)',
        'polaroid-hover': '0 30px 60px -15px rgba(43, 24, 16, 0.45), 0 12px 24px -8px rgba(43, 24, 16, 0.25)',
        'glass': '0 20px 60px -20px rgba(43, 24, 16, 0.25), inset 0 1px 0 rgba(255,255,255,0.4)',
        'glow': '0 0 40px rgba(201, 73, 70, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-rotate': 'floatRotate 40s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'grain-drift': 'grainDrift 8s steps(10) infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(201, 73, 70, 0.25)' },
          '50%': { boxShadow: '0 0 60px rgba(201, 73, 70, 0.5)' },
        },
        grainDrift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
      },
      letterSpacing: {
        'wide-cap': '0.18em',
      },
    },
  },
  plugins: [],
};

export default config;
