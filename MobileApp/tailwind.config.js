/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        piggiePink: "#EE7071",
        piggieLightPink: "#F2ABAC",
        piggiePinkText: "#F08889",
        piggieBlack: "#333333",
        piggieBlue: "#000B50",
        piggieGray: "#828282",
        piggieWhite: "#FFFFFF",
        piggieGreen: "#C5FC90",
        piggieLightGrey: "#F3F4F8"
      },
      fontFamily: {
        piggiebold: ["Montserrat-Bold", "sans-serif"],
        piggiesemiBold: ["Montserrat-SemiBold", "sans-serif"],
        piggiethin: ["Montserrat-Thin", "sans-serif"],
        piggiemedium: ["Montserrat-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
