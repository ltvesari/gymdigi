import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#121214",
        surfaceLight: "#1C1C1F",
        accent: "#6366F1",
        neon: "#CCFF00",
      },
    },
  },
  plugins: [],
};
export default config;
