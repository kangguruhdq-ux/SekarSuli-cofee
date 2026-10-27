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
        cream: {
          50: "#FCFAF7",
          100: "#F8F4ED",
          200: "#F0E7D8",
          300: "#E3D4BD",
          400: "#D1BC9A",
          500: "#BD9E74",
        },
        coffee: {
          50: "#FBF9F7",
          100: "#F3ECE6",
          200: "#E4D4C8",
          300: "#CCAFA0",
          400: "#AA806D",
          600: "#6B4938",
          700: "#54372A",
          800: "#3D261C",
          900: "#271710",
          950: "#1A0E0A",
        },
        olive: {
          50: "#F6F7F5",
          100: "#E9ECE6",
          200: "#D3D9CE",
          300: "#B3BEAA",
          600: "#5D6A53",
          700: "#4B5542",
          800: "#3E4637",
          900: "#2C3227",
        },
        gold: {
          400: "#DFBA75",
          500: "#C4984F",
          600: "#A87E39",
        },
        charcoal: {
          800: "#2B2623",
          900: "#1D1A18",
          950: "#131110",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
