import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        ink: "var(--color-ink)",
        "gray-50": "var(--gray-50)",
        "gray-100": "var(--gray-100)",
        "gray-200": "var(--gray-200)",
        "gray-300": "var(--gray-300)",
        "gray-400": "var(--gray-400)",
        "gray-500": "var(--gray-500)",
        "gray-600": "var(--gray-600)",
        "gray-700": "var(--gray-700)",
        "gray-800": "var(--gray-800)",
        "gray-900": "var(--gray-900)",
        "gray-950": "var(--gray-950)",
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        pixel: ["var(--font-pixel)", "var(--font-mono)", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "base-ui": ["15px", { lineHeight: "1.6", letterSpacing: "0" }],
        "small-ui": ["13px", { lineHeight: "1.5", letterSpacing: "0" }],
        "micro-label": [
          "10px",
          { lineHeight: "1.4", letterSpacing: "1px" },
        ],
        "display-title": ["3rem", { lineHeight: "1", letterSpacing: "0" }],
        "heading-1": ["1.6rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-2": ["1.3rem", { lineHeight: "1.25", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-3": ["1.1rem", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" }],
        "long-form": ["1.0625rem", { lineHeight: "1.75", letterSpacing: "0" }],
      },
      spacing: {
        "section": "3.5rem",
        "card": "1.25rem",
        "page-mobile": "1rem",
        "page-desktop": "1.5rem",
        "gap-sm": "0.75rem",
        "gap-md": "1rem",
        "gap-lg": "1.5rem",
      },
      borderRadius: {
        "card-lg": "16px",
        "card-md": "12px",
        "card-sm": "8px",
        "input": "6px",
        "pill": "9999px",
        "thumb": "10px",
      },
      boxShadow: {
        card: "0 8px 22px -14px rgba(0,0,0,0.25)",
        "card-hover": "0 18px 36px -20px rgba(0,0,0,0.40)",
        modal: "0 40px 90px -20px rgba(0,0,0,0.35)",
      },
      borderWidth: {
        hairline: "1px",
      },
      transitionDuration: {
        "micro": "200ms",
        "card": "350ms",
        "card-transform": "420ms",
        "theme": "500ms",
        "entrance": "700ms",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-up": "fadeUp var(--duration-entrance) var(--ease-out-expo) forwards",
        "pulse-slow": "pulse 1.8s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;