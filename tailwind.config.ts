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
        navy: {
          DEFAULT: "#0d1f3c",
          light: "#152848",
        },
        gold: {
          DEFAULT: "#b8962e",
          bright: "#d4a832",
        },
        "off-white": "#f5f3ee",
      },
      fontFamily: {
        display: ["var(--font-barlow-condensed)", "sans-serif"],
        body: ["var(--font-barlow)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-2px",
        tighter: "-1px",
        kicker: "3px",
        button: "2px",
      },
      lineHeight: {
        display: "0.9",
        body: "1.65",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        ticker: "ticker 25s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
