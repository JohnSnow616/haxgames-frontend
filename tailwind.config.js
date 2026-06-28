/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gv-bg': '#0d0d12',
        'gv-section': '#151520',
        'gv-card': '#1c1c28',
        'gv-accent': '#5c4d91',
        'gv-accent2': '#6b5ca5',
        'gv-grey': '#9a9ab0',
        'gv-border': '#242435',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}