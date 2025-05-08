import type { Config } from "tailwindcss";
// import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      // fontFamily: { sans: ["var(--font-sans)", ...fontFamily.sans] },
      colors: {
        /* shadcn token mapping */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        /* …secondary, destructive, muted, accent, popover, card */
      },
      borderRadius: { lg: "var(--radius)" },
      animation: {
        /* comes from tailwindcss‑animate */
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
