/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Nunito', 'sans-serif'], display: ['Playfair Display', 'serif'] },
      colors: {
        primary: { DEFAULT: '#FF6B2B', light: '#FF8C5A', dark: '#E05520' },
        teal: { DEFAULT: '#0D9488', light: '#14B8A6', dark: '#0A7A70' },
        warm: '#FFFBF7',
      },
      keyframes: {
        flyToProfile: {
          '0%':   { transform: 'translate(-50%,-50%) scale(1)',   opacity: '1' },
          '60%':  { transform: 'translate(-50%,-50%) scale(1.3)', opacity: '1' },
          '100%': { transform: 'translate(calc(50vw - 40px), calc(-50vh + 30px)) scale(0.15)', opacity: '0' },
        },
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0)', opacity: '0' },
          '60%':  { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulse2: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(255,107,43,0.4)' },
          '50%':     { boxShadow: '0 0 0 15px rgba(255,107,43,0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        flyToProfile: 'flyToProfile 1.2s cubic-bezier(0.4,0,0.2,1) forwards',
        fadeInUp:     'fadeInUp 0.5s ease-out forwards',
        bounceIn:     'bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
        pulse2:       'pulse2 1.5s infinite',
        shimmer:      'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
