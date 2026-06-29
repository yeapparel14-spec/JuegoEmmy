/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './config/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        rosa: {
          50:  '#FFF0F3',
          100: '#FFE0EB',
          200: '#FFBCD0',
          300: '#FF8FAB',
          400: '#FF6B8A',
          500: '#F24E72',
          600: '#E8446B',
          700: '#C2185B',
          800: '#8B1A4A',
          900: '#4A1528',
        },
        dorado: {
          300: '#FFD88A',
          400: '#F4A261',
          500: '#E76F51',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float':        'float 4s ease-in-out infinite',
        'pulse-heart':  'pulseHeart 1.4s ease-in-out infinite',
        'fade-in':      'fadeIn 0.5s ease-out forwards',
        'slide-up':     'slideUp 0.45s ease-out forwards',
        'bounce-soft':  'bounceSoft 0.4s ease-out',
        'sparkle':      'sparkle 2s ease-in-out infinite',
        'pop-in':       'popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        pulseHeart: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.18)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSoft: {
          '0%':   { transform: 'scale(1)' },
          '50%':  { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.85) rotate(0deg)' },
          '50%':      { opacity: '1',   transform: 'scale(1.15) rotate(15deg)' },
        },
        popIn: {
          from: { opacity: '0', transform: 'scale(0.7)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
