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
        // Body text. `muted` is tuned to sit at ~5.9:1 / ~7.5:1 contrast
        // against `bg` in light/dark mode respectively (AA-safe for small text).
        ink: {
          DEFAULT: "#1A1D23",
          dark: "#E4E7EC",
          muted: "#59626F",
          "muted-dark": "#9AA2AF",
        },
        // Brand accent (rose) — primary links, h2, top-level emphasis.
        signal: {
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
        },
        // Informational accent (blue) — inline code, "info" callouts, technical terms.
        info: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        // Secondary accent (violet) — h3/sub-headings, "note" callouts, secondary tags.
        accent: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
        },
        // Tertiary accent (teal) — category tags / supplementary highlights.
        teal: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
        },
        amber: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          400: "#F5C94B",
          500: "#F2B705",
          600: "#C99304",
          700: "#B45309",
          800: "#92400E",
        },
        success: {
          DEFAULT: "#34D399",
          50: "#ECFDF5",
          100: "#D1FAE5",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        danger: {
          DEFAULT: "#F87171",
          50: "#FEF2F2",
          100: "#FEE2E2",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
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
