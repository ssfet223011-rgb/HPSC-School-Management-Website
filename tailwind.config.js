/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1300px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        school: {
          navy: "#082E50",
          academic: "#124C7C",
          royal: "#1C5A91",
          gold: "#D6A545",
          lightGold: "#F1D79B",
          cream: "#FBF8F0",
          body: "#183149",
          muted: "#64748B",
          border: "#E8DFC9",
          success: "#198754",
          warning: "#D99A20",
          error: "#C23B3B",
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'Cambria', 'serif'],
        bengali: ['var(--font-bengali)', '"Hind Siliguri"', '"Noto Serif Bengali"', 'SolaimanLipi', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        academic: '0 2px 8px -2px rgba(8, 46, 80, 0.08), 0 1px 4px -1px rgba(8, 46, 80, 0.04)',
        card: '0 2px 6px 0 rgba(8, 46, 80, 0.06), 0 0 1px 1px rgba(232, 223, 201, 0.5)',
        gold: '0 2px 10px -2px rgba(214, 165, 69, 0.3)',
      },
    },
  },
  plugins: [],
}
