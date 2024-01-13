/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./views/**/*.{html,ejs}"],
  safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        serif: ['Merriweather', 'serif'],
      },
      animation: {
        float: 'float 2s ease-in-out infinite',
      },
      transitionProperty: {
        'width': 'width'
      },
      minWidth: {
        '20': '20rem'
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],
}

