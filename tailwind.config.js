/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-light": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-dark": "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        spinSlow: "spin 6s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
