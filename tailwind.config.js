module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        nav: "912px",
        desktop: "1100px",
        desktopPlus: "1600px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
