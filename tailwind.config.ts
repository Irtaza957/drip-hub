import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#141A2E",
        secondary: "#23253A",
        tertiary: "#282A3D",
        accent: "#FF4B57",
        border: "#3B2A44",
        highlight: "#434456",
        "light-text": "#3B3F4B",
        "light-primary": "#F1F3F4",
      },
      screens: {
        md: "1024px",
        lg: "1440px",
        xl: "1500px",
        "3xl": "3000px",
      },
      animation: {
        fadeDots: "fadeDots .8s infinite",
        "caret-blink": "caret-blink 1.2s ease-out infinite",
      },
      keyframes: {
        fadeDots: {
          "0%": { opacity: "0.2", transform: "scale(0.1)" },
          "60%": { opacity: "1", transform: "scale(1.2)" },
          "100%": { opacity: "0.2", transform: "scale(0.1)" },
        },
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
