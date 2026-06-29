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
        surface: "#11102A",
        "surface-light": "#1A1840",
        "surface-hover": "#221F52",
        border: "#2D2660",
        "border-bright": "#5B4FCC",
        primary: "#7C3AED",
        "primary-hover": "#6D28D9",
        "primary-light": "#A78BFA",
        "primary-glow": "rgba(124, 58, 237, 0.25)",
        accent: "#8B5CF6",
        "accent-bright": "#C4B5FD",
        "text-primary": "#FFFFFF",
        "text-secondary": "#C4B5FD",
        "text-muted": "#7E78A3",
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
        "glow-sm": "0 0 12px 0 rgba(124, 58, 237, 0.4)",
        "glow-md": "0 0 24px 4px rgba(124, 58, 237, 0.35)",
        "glow-lg": "0 0 48px 8px rgba(124, 58, 237, 0.25)",
        card: "0 8px 32px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
