/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,ts,html}"],
  theme: {
    fontFamily: {
      base: ["Inter", "Arial", "sans-serif"],
    },
    colors: {
      green: "var(--green)",
      white: "var(--white)",
      "dark-grey": "var(--dark-grey)",
    },
  },
};
