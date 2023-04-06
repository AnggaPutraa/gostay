/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f0f3ff',
          '100': '#e4e9ff',
          '200': '#cdd6ff',
          '300': '#a6b4ff',
          '400': '#7382ff',
          '500': '#3b44ff',
          '600': '#1614ff',
          '700': '#0000ff',
          '800': '#0101d6',
          '900': '#0303af',
          '950': '#000577',
      },
      }
    },
  },
  plugins: [],
}

