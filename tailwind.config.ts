import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Source Serif 4 — primary display face
        display: ["var(--font-display)", "Georgia", "serif"],
        // Instrument Serif — italic accent only
        serif: ["var(--font-serif)", "Georgia", "serif"],
        // Instrument Sans — body & UI (pairs with Instrument Serif italic)
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // JetBrains Mono — figures & metadata
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // Legacy alias used by /privacy /terms /security pages — points to display
        heading: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        // ── Halo palette (the brand) ──
        halo: {
          sky: "#50C7FA",
          periwinkle: "#93C3FF",
          lavender: "#C4A7E7",
          blossom: "#E3C6FF",
          mint: "#A7DFD8",
          cream: "#F4E2CB",
          peach: "#FFD3B0",
          butter: "#FFE9B8",
        },
        // ── Surfaces (light) ──
        base: "#F8F7F4",
        surface: {
          DEFAULT: "#FFFFFF",
          1: "#FFFFFF",
          2: "#FBFAF6",
          3: "#F1EFE9",
          ink: "#14131C",
        },
        // ── Borders ──
        border: {
          DEFAULT: "#DEDBD2",
          hair: "#ECEAE3",
          strong: "#C7C3B6",
        },
        // ── Text / foreground ──
        fg: {
          1: "#14131C",
          2: "#4A4858",
          3: "#76737F",
          4: "#ABA8B0",
        },
        // ── Brand accent — deeper lavender for light mode contrast ──
        accent: {
          DEFAULT: "#7B5BD6",
          hover: "#6A47CC",
          press: "#573AB4",
          fg: "#FFFFFF",
        },
        // ── RAG (light-mode tuned) ──
        red: { DEFAULT: "#C8333A" },
        amber: { DEFAULT: "#B5781A" },
        green: { DEFAULT: "#1F8A5B" },

        // ── Legacy aliases used by /privacy /terms /security pages ──
        "pastel-border": "#DEDBD2",
        "pastel-border-hover": "#C7C3B6",
        text: {
          primary: "#14131C",
          secondary: "#4A4858",
          tertiary: "#76737F",
        },
      },
      letterSpacing: {
        eyebrow: "0.14em",
        wide: "0.12em",
        "heading-tight": "-1.5px",
        heading: "-0.5px",
      },
      backgroundImage: {
        "halo-linear":
          "linear-gradient(112deg, #50C7FA 0%, #93C3FF 22%, #C4A7E7 42%, #E3C6FF 58%, #FFD3B0 78%, #FFE9B8 100%)",
        "halo-radial":
          "radial-gradient(120% 100% at 35% 30%, #50C7FA 0%, #93C3FF 22%, #C4A7E7 42%, #E3C6FF 58%, #FFD3B0 75%, #FFE9B8 88%, #A7DFD8 100%)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "halo-drift": {
          "0%": {
            transform: "translate(0,0) rotate(-2deg)",
            borderRadius: "47% 53% 51% 49% / 49% 47% 53% 51%",
          },
          "100%": {
            transform: "translate(20px, 24px) rotate(2deg)",
            borderRadius: "53% 47% 49% 51% / 51% 53% 47% 49%",
          },
        },
      },
      animation: {
        ticker: "ticker 36s linear infinite",
        "blink-cursor": "blink-cursor 1.1s infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "halo-drift":
          "halo-drift 18s cubic-bezier(0.2,0.8,0.2,1) infinite alternate",
      },
    },
  },
  plugins: [],
}
export default config
