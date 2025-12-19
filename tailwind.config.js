/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        card: "#18181b",
        "card-hover": "#27272a",
        border: "#27272a",
        muted: "#71717a",
        accent: "#10b981",
      },
    },
  },
  plugins: [],
}
