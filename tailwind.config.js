/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        greatvibes: ['"Great Vibes"', 'cursive'], // Reemplazado por "Great Vibes"
      },
      colors: {
        sgreen: '#006B0B',
        bgreen: '#003B06',
      },
    },
  },
  plugins: [],
}
