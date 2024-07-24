import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      josefinSans: ["__Josefin_Sans_f4c4b3", "__Josefin_Sans_Fallback_f4c4b3"],
      researcher: ["__researcher_2c0b3a", "__researcher_Fallback_2c0b3a"],
    },
  },
  plugins: [],
};
export default config;
