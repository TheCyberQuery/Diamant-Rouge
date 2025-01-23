/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ebony: '#0A0A0A',
        crimson: '#A00000',
        gold: '#C9B37C',
        ivory: '#F5F5F0',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Didot', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
};
