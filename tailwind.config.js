/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roadRage: ['"Road Rage"', 'cursive'],
      },
    },
  },
  plugins: [],
}
