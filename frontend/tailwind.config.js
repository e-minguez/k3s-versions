/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        pineGreen: '#0C322C',
        jungleGreen: '#30BA78',
        midnightBlue: '#192072',
        waterholeBlue: '#2453FF',
        mint: '#90EBCD',
        persimmon: '#FE7C3F',
        fog: '#EFEFEF',
      },
    },
  },
  plugins: [],
};
