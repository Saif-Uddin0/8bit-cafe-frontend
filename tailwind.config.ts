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
        background: "#080818",
        surface: "#0C0824",
        "surface-light": "#160D38",
        "surface-hover": "#1E1248",
        border: "#2A1860",
        "border-bright": "#6C04D7",
        /* Brand primary purple */
        primary: "#6C04D7",
        "primary-hover": "#7d15e0",
        /* Brand primary pink — used for active/accent text */
        "primary-light": "#CD4ECD",
        "primary-glow": "rgba(108, 4, 215, 0.28)",
        accent: "#9B2FE8",
        "accent-bright": "#CD4ECD",
        "text-primary": "#FFFFFF",
        "text-secondary": "#D9A8FF",
        "text-muted": "#8A7DB5",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#38BDF8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-orbitron)", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "28px",
      },
      boxShadow: {
        "glow-sm": "0 0 12px 0 rgba(108, 4, 215, 0.45)",
        "glow-md": "0 0 24px 4px rgba(108, 4, 215, 0.38)",
        "glow-lg": "0 0 48px 8px rgba(108, 4, 215, 0.28)",
        card: "0 8px 32px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
