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
        base: "#08080C",
        surface: "#0D0D14",
        "surface-2": "#121219",
        "pastel-border": "#1A1A28",
        "pastel-border-hover": "#252538",
        accent: "#C8A2FF",
        "accent-deep": "#8B5CF6",
        warm: "#E8C4A0",
        "warm-dark": "#D4956B",
        "text-primary": "#EEEDF5",
        "text-secondary": "#9896A8",
        "text-tertiary": "#5C5A6E",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "DM Sans", "system-ui", "sans-serif"],
        heading: [
          "var(--font-heading)",
          "Instrument Serif",
          "Georgia",
          "serif",
        ],
      },
      letterSpacing: {
        "heading-tight": "-1.5px",
        "heading": "-0.5px",
      },
      keyframes: {
        "scroll-logos": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "scroll-logos": "scroll-logos 30s linear infinite",
        "blink-cursor": "blink-cursor 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
