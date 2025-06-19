/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_color: "#FF6223",
        secondary_color: "#F9B83F",
        accent_color_1: "#239F00",
        accent_color_2: "#FFF9F1",
        white_color: "#FFFFFF",
        black_color: "#212121",
      },
      fontFamily: {
        font_heading: ["Mona Sans"],
        font_paragraph: ["Mona Sans"],
      },
    },
  },
  plugins: [],
};
