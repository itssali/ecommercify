import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        secondary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 10px rgba(66, 153, 225, 0.5), 0 0 20px rgba(66, 153, 225, 0.3), 0 0 30px rgba(66, 153, 225, 0.1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }: { addUtilities: Function, theme: Function }) {
      const newUtilities = {
        ".glass": {
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
          ".dark &": {
            background: "rgba(17, 25, 40, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.075)",
          }
        },
        ".glass-dark": {
          background: "rgba(17, 25, 40, 0.75)",
          backdropFilter: "blur(20px)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        },
        ".glass-card": {
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          ".dark &": {
            background: "rgba(17, 25, 40, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.075)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
          }
        },
        ".glass-button": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          transition: "all 0.3s ease",
          ".dark &": {
            background: "rgba(17, 25, 40, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.075)",
          }
        },
        ".glass-button:hover": {
          background: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          ".dark &": {
            background: "rgba(17, 25, 40, 0.7)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
          }
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config; 