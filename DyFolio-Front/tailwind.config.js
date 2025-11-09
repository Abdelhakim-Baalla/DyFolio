/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/**/*.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        alt: "#f5f7fb",
        panel: "rgba(255,255,255,0.82)",
        border: "rgba(12,16,24,0.12)",
        accent: "#0071e3",
        dark: {
          background: "#04060b",
          panel: "#0f1729",
          border: "rgba(220,235,255,0.08)",
          accent: "#4cc9ff",
        },
      },
      boxShadow: {
        soft: "0 26px 48px -28px rgba(15,23,42,0.22)",
      },
      fontFamily: {
        sans: [
          "Outfit",
          "Poppins",
          "Montserrat",
          "Open Sans",
          "SF Pro Display",
          "SF Pro Text",
          "sans-serif",
        ],
        mono: ["Roboto Mono", "monospace"],
      },
      borderRadius: {
        xs: "10px",
        sm: "16px",
        md: "24px",
        lg: "32px",
        xl: "48px",
      },
      spacing: {
        1: "0.625rem",
        2: "1rem",
        3: "1.5rem",
        4: "2rem",
        5: "2.5rem",
        6: "3rem",
        7: "3.5rem",
        8: "4rem",
        9: "4.5rem",
        10: "5.5rem",
      },
    },
  },
  plugins: [],
};
