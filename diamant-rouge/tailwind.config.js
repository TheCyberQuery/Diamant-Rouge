/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class', // Activate dark mode via a .dark class
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
    './styles/globals.css',
  ],
  safelist: [
    // Safelist your dynamically added classes
    'button-primary',
    'button-secondary',
    'card',
    'alert',
    'hover-scale',
    'image-luxury',
    'input-field',
    'dropdown-menu',
    'dropdown-menu-active',
    'text-ivory',
    'bg-ivory',
    'text-royalGold',
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        brandIvory: '#FAF3E3', // Light ivory background
        brandGold: '#D4AF37',  // Luxurious gold accents
        burgundy: '#6A0F23',   // Rich accent for hovers & dark sections
        richEbony: '#0A0A0A',  // Dark text for light mode; switch to gold headings in dark mode
        deepBlack: '#0C0C0C',
        platinumGray: '#B0B0B0',
        diamondWhite: '#FCFCFC',
        ivory: '#FFFFF0',
      },
      fontFamily: {
        sans: ['railway-reg', ...defaultTheme.fontFamily.sans],
        serif: ['railway-reg', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        '6.5xl': '4rem',
        '7.5xl': '5.25rem',
        '8xl': '6rem',
      },
      boxShadow: {
        luxury: '0 4px 15px rgba(212, 175, 55, 0.4)',
        subtle: '0 2px 8px rgba(255, 255, 255, 0.1)',
        deepGlow: '0px 8px 30px rgba(212, 175, 55, 0.6)',
        regal: '0 0 30px rgba(212, 175, 55, 0.8)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      screens: {
        '2xl': '1440px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(145deg, #D4AF37 0%, #6A0F23 100%)',
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out forwards',
        slideIn: 'slideIn 0.5s ease-in-out forwards',
        drift: 'drift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
