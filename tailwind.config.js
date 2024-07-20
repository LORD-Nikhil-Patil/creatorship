/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      light_gray: "#c4c7c7",
      light_pink: "#f8ede0",
      white_pink: "#dbb7b2",
      dark_pink: "#c88880",
      black: "#040402"
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

