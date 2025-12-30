import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#050B1E",
        aqua: "#00E5FF",
        lime: "#7CFF00",
        berry: "#7B2D8D",
        ink: "#07112E"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0,0,0,0.35)",
        glowAqua: "0 0 0 1px rgba(0,229,255,0.25), 0 18px 60px rgba(0,229,255,0.18)",
        glowLime: "0 0 0 1px rgba(124,255,0,0.25), 0 18px 60px rgba(124,255,0,0.14)",
        glowBerry: "0 0 0 1px rgba(123,45,141,0.25), 0 18px 60px rgba(123,45,141,0.18)"
      }
    }
  },
  plugins: []
} satisfies Config;
