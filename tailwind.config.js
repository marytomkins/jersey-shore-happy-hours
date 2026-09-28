module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        nav: "912px",
        desktop: "1100px",
        desktopPlus: "1600px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
