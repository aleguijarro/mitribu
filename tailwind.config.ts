import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Sistema de diseño de MiTribu.
 *
 * Todos los colores se definen como variables CSS en `src/app/globals.css`
 * (formato HSL) para poder soportar dark mode y para que se puedan
 * retocar fácilmente desde un único sitio sin tener que tocar componentes.
 */
export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1360px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          hover: "hsl(var(--surface-hover))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        coral: {
          DEFAULT: "hsl(var(--coral))",
          foreground: "hsl(var(--coral-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 6px)",
        "2xl": "calc(var(--radius) + 14px)",
        "3xl": "calc(var(--radius) + 22px)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 1px 0 rgb(0 0 0 / 0.03)",
        soft: "0 4px 16px -4px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.04)",
        elevated:
          "0 12px 32px -8px rgb(0 0 0 / 0.12), 0 4px 12px -4px rgb(0 0 0 / 0.06)",
        glow: "0 0 0 1px hsl(var(--primary) / 0.15), 0 8px 24px -6px hsl(var(--primary) / 0.25)",
      },
      backgroundImage: {
        "tribu-gradient":
          "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-600)) 100%)",
        "tribu-radial":
          "radial-gradient(120% 120% at 10% 0%, hsl(var(--primary-100)) 0%, transparent 55%)",
        "warm-fade":
          "linear-gradient(180deg, transparent 0%, hsl(var(--background)) 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pop": {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.25)" },
          "60%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        pop: "pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        shimmer: "shimmer 1.6s infinite linear",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
