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
        royal: {
          navy: "#0B1B3D",
          navyDark: "#071229",
          navyLight: "#162447",
          gold: "#C5A059",
          goldLight: "#DFBA75",
          goldDark: "#8C6D37",
          goldMuted: "#B88E44",
          parchment: "#FAF5ED",
          parchmentAged: "#F5EFEB",
          parchmentBorder: "#E8DFC8",
          charcoal: "#1B2430",
          mutedBrown: "#605A55",
        },
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
        cinzel: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
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
