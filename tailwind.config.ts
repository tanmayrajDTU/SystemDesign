import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        bg: {
          DEFAULT: "#FAFAF9",
          dark: "#0A0E14",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#10151D",
          raised: "#F3F4F6",
          "raised-dark": "#161C26",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#1E2530",
        },
        ink: {
          DEFAULT: "#1A1D23",
          dark: "#E4E7EC",
          muted: "#6B7280",
          "muted-dark": "#8B93A1",
        },
        signal: {
          50: "#FFF1F2",
          200: "#FECDD3",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
        },
        amber: {
          400: "#F5C94B",
          500: "#F2B705",
          600: "#C99304",
        },
        success: "#34D399",
        danger: "#F87171",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#1A1D23",
            "--tw-prose-headings": "#1A1D23",
            "--tw-prose-links": "#E11D48",
            "--tw-prose-bold": "#1A1D23",
            "--tw-prose-code": "#1A1D23",
            maxWidth: "none",
          },
        },
      }),
      keyframes: {
        "packet-travel": {
          "0%": { offsetDistance: "0%", opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { offsetDistance: "100%", opacity: "0" },
        },
      },
      animation: {
        "packet-travel": "packet-travel 3.4s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
