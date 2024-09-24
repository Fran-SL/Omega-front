/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
      sgreen: '#006B0B',
      bgreen: '#003B06', // Reemplaza con el valor hexadecimal correcto si es distinto
    },},
  },
  plugins: [],
}
