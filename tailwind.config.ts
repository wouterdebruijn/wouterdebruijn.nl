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
      gridTemplateColumns: {
        "text-section": "1fr 1fr",
      },
    },
    fontFamily: {
      "teko": ["Teko", "sans-serif"],
      "roboto": ["Roboto", "sans-serif"],
    },
  },
} satisfies Config;
