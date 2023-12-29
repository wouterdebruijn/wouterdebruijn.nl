import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1AE0BD",
        "secondary": "#FACA3F",
        "background": "#222222",
      },
      scale: {
        "101": "1.01",
      },
    },
    fontFamily: {
      "teko": ["Teko", "sans-serif"],
      "roboto": ["Roboto", "sans-serif"],
    },
  },
} satisfies Config;
