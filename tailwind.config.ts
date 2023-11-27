import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mb: "1100px",
        nb: "900px",
        smm: "600px",
      },
      colors: {
        primary: "#099B87",
        secondary: "#004D5E",
        bgSecondary: "#00473E",
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
        40: "40px",
      },
      borderColor: {
        inputBorder: "#E3E3E3",
      },
    },
  },
  plugins: [],
};
export default config;
