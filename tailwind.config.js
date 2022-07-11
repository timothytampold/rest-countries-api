/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './common/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'desktop': '800px'
    },
    fontFamily: {
      'nunito-sans': ['Nunito Sans', 'sans-serif']
    },
    fontWeight: {
      'light': 300,
      'base': 400,
      'bold': 600,
      'extra-bold': 800
    },
    colors: {
      'white': 'hsl(0, 0%, 100%)',
      'gray-400': 'hsl(0, 0%, 98%)',
      'gray-500': 'hsl(0, 0%, 52%)',
      'blue-400': 'hsl(209, 23%, 22%)',
      'blue-500': 'hsl(207, 26%, 17%)',
      'blue-600': 'hsl(200, 15%, 8%)'
    },
    extend: {}
  },
  plugins: []
}