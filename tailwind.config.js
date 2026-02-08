/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFC700', // Sariq (Yellow)
          hover: '#E6B400',
        },
        secondary: {
          DEFAULT: '#000000', // Black
          hover: '#1a1a1a',
        },
        dark: {
          900: '#121212',
          800: '#1e1e1e',
          700: '#2d2d2d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Professional, clean font
      }
    },
  },
  plugins: [],
}
