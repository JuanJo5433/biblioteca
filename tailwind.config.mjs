import {heroui} from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--espresso-brown)",
          hover: "var(--hover-brown)",
        },
        secondary: {
          DEFAULT: "var(--library-green)",
          hover: "var(--hover-green)",
        },
        background: {
          main: "var(--background-main)",
          secondary: "var(--background-secondary)",
          dark: "var(--background-dark)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          highlight: "var(--text-highlight)",
        },
      },
      boxShadow: {
        "elevation-1": "0 2px 8px var(--shadow-light)",
        "elevation-2": "0 4px 16px var(--shadow-medium)",
        "elevation-3": "0 8px 24px var(--shadow-dark)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
