const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/globals.css',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Color Palette (Fix: Convert camelCase to kebab-case)
        'rich-ebony': '#0A0A0A', // Deep black background
        'velvet-crimson': '#A00000', // Premium dark red
        'royal-gold': '#C9B37C', // Elegant gold
        'soft-ivory': '#F5F5F0', // Soft white for text contrast
        'diamond-white': '#FCFCFC', // Bright white for highlights
        'platinum-gray': '#C0C0C0', // Metallic touch for text & borders
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans], // Modern sans-serif
        serif: ['Didot', 'serif'], // Elegant luxury serif
      },
      boxShadow: {
        luxury: '0 4px 15px rgba(201, 179, 124, 0.3)', // Soft golden glow
        subtle: '0 2px 8px rgba(255, 255, 255, 0.1)', // Subtle floating effect
      },
      letterSpacing: {
        tight: '-0.02em', // Slightly condensed for elegance
        wide: '0.08em', // Extra space for luxury typography
      },
      spacing: {
        18: '4.5rem', // Extra-large spacing option
        22: '5.5rem',
        26: '6.5rem',
      },
      screens: {
        '2xl': '1440px', // Optimized for large screens
        '3xl': '1600px',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem', // More rounded for a soft luxury feel
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'), // Adds RTL support for Arabic users
    require('@tailwindcss/forms'), // Enhances form input styling
    require('@tailwindcss/typography'), // Optimizes readability
    require('@tailwindcss/aspect-ratio'), // Ensures image consistency
  ],
};
