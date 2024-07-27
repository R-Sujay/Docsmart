import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      josefinSans: ["__Josefin_Sans_f4c4b3", "__Josefin_Sans_Fallback_f4c4b3"],
      researcher: ["__researcher_2c0b3a", "__researcher_Fallback_2c0b3a"],
      montserrat: ["__Montserrat_b1da2a", "__Montserrat_Fallback_b1da2a"],
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "790px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      heightMin: { raw: "(min-height: 680px)" },
    },
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
export default config;
