const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './styles/globals.css',
  ],
  safelist: [
    'button-primary',
    'button-secondary',
    'card',
    'alert',
    'hover-scale',
    'image-luxury',
    'input-field',
    'dropdown-menu',
    'dropdown-menu-active',
    'text-ivory', // ✅ Ensure ivory is registered
    'bg-ivory',
    'text-royalGold',
  ],
  theme: {
    extend: {
      colors: {
        richEbony: '#0A0A0A',
        velvetCrimson: '#8B0000',
        royalGold: '#D4AF37',
        softIvory: '#F5F5F0',
        ivory: '#FFFFF0',
        diamondWhite: '#FCFCFC',
        platinumGray: '#B0B0B0',
        deepBlack: '#0C0C0C',
      },

      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        serif: ['Didot', 'serif'],
      },

      boxShadow: {
        luxury: '0 4px 15px rgba(201, 179, 124, 0.4)',
        subtle: '0 2px 8px rgba(255, 255, 255, 0.1)',
        deepGlow: '0px 8px 30px rgba(212, 175, 55, 0.6)',
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
      },

      screens: {
        '2xl': '1440px',
        '3xl': '1600px',
        '4xl': '1920px',
      },

      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
