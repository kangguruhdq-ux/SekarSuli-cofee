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
        njongke: {
          dark: "#0a1510",
          darker: "#060e0a",
          moss: "#10211a",
          cream: "#fbf9f4",
          light: "#f6f4ee",
          textLight: "#e4ded5",
          muted: "#9ba79f",
          gold: "#c9a86a",
          goldLight: "#dfbf80",
          goldHover: "#dfba75",
          terracotta: "#b85d3b",
          sage: "#738278",
          darkText: "#3a4740",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Newsreader", "Georgia", "serif"],
        serif: ["var(--font-display)", "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.18em",
        "wide-editorial": "0.25em",
      },
    },
  },
  plugins: [],
};

export default config;
