import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0A0A0B", surface: "#131316", elevated: "#1A1A1F", overlay: "#212126" },
        line: { DEFAULT: "#26262E", strong: "#3F3F46" },
        ink: { DEFAULT: "#FAFAFA", dim: "#A1A1AA", mute: "#71717A", ghost: "#52525B", trace: "#3F3F46" },
        accent: {
          lime: "#A3E635",
          blue: "#60A5FA",
          amber: "#FBBF24",
          red: "#F87171",
          violet: "#A78BFA",
          orange: "#FB923C",
          emerald: "#34D399",
          rose: "#FB7185",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: { "2xs": "0.6875rem" },
      letterSpacing: { tightest: "-0.04em" },
      animation: {
        "fade-in": "fadeIn 200ms ease-out",
        "slide-up": "slideUp 280ms cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseSoft: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.5" } },
      },
    },
  },
  plugins: [],
};
export default config;
