import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F6F4EE",
        surface: "#FFFFFF",
        ink: "#0A0A0A",
        muted: "#575653",
        subtle: "#EAE6DD",
        accent: "#F25C19",
        hairline: "#D8D3C8",
        aiidl: {
          navy: "#0A0A0A",
          ink: "#0A0A0A",
          orange: "#F25C19",
          orangeHover: "#D94B0F",
          paper: "#F6F4EE",
          surface: "#FFFFFF",
          muted: "#EAE6DD",
          border: "#D8D3C8",
          slate: "#575653",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
