module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        nav: "912px",
        lg: "1024px",
        desktop: "1100px",
        xl: "1280px",
        "2xl": "1536px",
        desktopPlus: "1600px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
