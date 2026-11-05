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
        // Renk Paleti:
        // %60 Marshmallow White (Temiz, ferah zemin ve kartlar)
        // %30 Galactic Violet (Ana marka, başlıklar, butonlar, menü öğeleri)
        // %10 Bubblegum Pink (Vurgular, etiketler, canlı aksiyon detayları)
        marshmallow: {
          DEFAULT: "#F0F0F0",
          pure: "#FFFFFF",
          subtle: "#F8F8FA",
          darker: "#E5E5EB",
          border: "#E2E2EA",
        },
        galactic: {
          DEFAULT: "#105BFF",
          light: "#3374FF",
          dark: "#0841C4",
          surface: "rgba(16, 91, 255, 0.08)",
          border: "rgba(16, 91, 255, 0.2)",
        },
        bubblegum: {
          DEFAULT: "#FE4BA8", // Görseldeki canlı neon Bubblegum pembe tonu (Hex #FE85D0 / #FE4BA8)
          light: "#FFA0D8",
          dark: "#D82684",
          surface: "rgba(254, 75, 168, 0.12)",
        },
        // Koyu metinler için kontrast renkler
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
