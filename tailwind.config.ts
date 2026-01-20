import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Korean Design System Colors
        primary: {
          DEFAULT: "#1a1a2e",
          dark: "#0f0f1a",
          light: "#2d2d4a",
        },
        accent: {
          gold: "#d4af37",
          "gold-light": "#e8c857",
          "gold-dark": "#b8962e",
        },
        lucky: {
          red: "#c73e3a",
          "red-light": "#e05550",
          "red-dark": "#a33330",
        },
        neutral: {
          cream: "#faf7f2",
          "cream-dark": "#f0ebe0",
          warm: "#f5f0e8",
        },
        tech: {
          blue: "#4361ee",
          "blue-light": "#5c7aff",
          "blue-dark": "#3451cc",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-kr)", "sans-serif"],
        display: ["var(--font-pretendard)", "var(--font-noto-sans-kr)", "sans-serif"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "number-reveal": "numberReveal 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(212, 175, 55, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.4)" },
        },
        pulseGold: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        numberReveal: {
          "0%": { transform: "scale(0) rotate(180deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "korean-pattern": "url('/images/korean-cloud-pattern.svg')",
        "taegeuk-gradient": "conic-gradient(from 0deg, #c73e3a 50%, #4361ee 50%)",
      },
      boxShadow: {
        "gold": "0 4px 14px 0 rgba(212, 175, 55, 0.39)",
        "gold-lg": "0 10px 40px 0 rgba(212, 175, 55, 0.5)",
        "inner-gold": "inset 0 2px 4px 0 rgba(212, 175, 55, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
