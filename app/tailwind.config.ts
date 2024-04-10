/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,ts,html}"],
  theme: {
    fontFamily: {
      base: ["Inter", "Arial", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      green: "var(--green)",
      white: "var(--white)",
      "white-2": "var(--white-2)",
      "light-grey": "var(--light-grey)",
      "dark-grey": "var(--dark-grey)",
      "dark-grey-30": "var(--dark-grey-30)",
      "dark-grey-80": "var(--dark-grey-80)",
      red: "var(--red)",
    },
    extend: {
      padding: {
        default: "var(--padding-default)",
      },
      borderRadius: {
        default: "var(--border-radius-default)",
      },
    },
  },
};
