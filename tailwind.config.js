module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        nav: "912px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
