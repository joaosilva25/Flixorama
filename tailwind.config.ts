import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'xs': {'min': '0', 'max': '339px'},
        'sm': {'min': '339px', 'max': '639px'}, 
      },
      width: {
        'movieBoxMobile':'300px',
        'movieBoxMdAndLgDevices':'550px'
      },
      height: {
        'movieBoxMobile':'400px',
        'movieBoxMdAndLgDevices':'700px'
      }
    },
  },
  plugins: [],
};
export default config;
