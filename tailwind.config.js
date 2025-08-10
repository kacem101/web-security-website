/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': '#0A192F',
        'dark-secondary': '#112240',
        'neon-blue': '#64FFDA',
        'neon-green': '#A8FF60',
        'text-light': '#E6F1FF',
        'text-gray': '#8892B0',
      },
      fontFamily: {
        'mono': ['Fira Code', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}