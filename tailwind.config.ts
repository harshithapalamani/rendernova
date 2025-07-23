import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#F4F7FE",
          200: "#BCB6FF",
          400: "#868CFF",
          500: "#7857FF",
          600: "#4318FF",
        },
        dark: {
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        black: {
          100: "#1a1a1a",
          200: "#171717",
          300: "#0f0f0f",
          400: "#0a0a0a",
          500: "#000000",
        },
      },
      fontFamily: {
        ibm: ["var(--font-ibm-plex)"],
      },
      backgroundImage: {
        "nav-focus":
          "linear-gradient(270deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "black-gradient": "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #262626 100%)",
      },
      boxShadow: {
        "dropdown-shadow": "0 4px 30px rgba(0, 0, 0, 0.1)",
        "sidebar-shadow": "0 0 50px rgba(120, 87, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
