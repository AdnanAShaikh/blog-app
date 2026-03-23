/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        smd: "420px", //small-medium
      },
      fontFamily: {
        sans: ["serif", "Helvetica", "Arial", "sans-serif"],
      },

      colors: {
        primary: "#eff7f6",
      },
      fontSize: {
        "10xl": "110px",
      },
    },
  },
  plugins: [],
};
