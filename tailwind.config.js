/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/template/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'black-900': '#191919',
        'black-800': '#2B2B2B',
      },
      minWidth: {
        '300': '300px',
      },
      maxWidth: {
        '200': '200px',
        '300': '300px',
        '350': '350px',
      }
    },
  },
  variants: {
  },
  plugins: [],
}