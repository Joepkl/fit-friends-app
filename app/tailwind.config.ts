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
      "white-2": "var(--white-2)",
      "light-grey": "var(--light-grey)",
      "dark-grey": "var(--dark-grey)",
      "dark-grey-transparent": "var(--dark-grey-transparent)",
      red: "var(--red)",
    },
    extend: {
      padding: {
        default: "var(--padding-default)",
      },
    },
  },
};
