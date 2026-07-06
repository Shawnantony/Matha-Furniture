import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: "#faf6f0",
          100: "#f2e8da",
          200: "#e4d0b4",
          300: "#d3b184",
          400: "#c19158",
          500: "#b0783f",
          600: "#996234",
          700: "#7c4d2d",
          800: "#663f2a",
          900: "#553526",
          950: "#301b13",
        },
        cream: "#fbf9f6",
        charcoal: "#2b2521",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        bahamas: ['"Bauhaus 93"', "var(--font-bahamas)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(85, 53, 38, 0.25)",
        card: "0 4px 24px -8px rgba(48, 27, 19, 0.15)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "slow-zoom": "slow-zoom 12s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
