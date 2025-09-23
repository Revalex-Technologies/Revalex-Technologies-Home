/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#e50914",
          dark: "#1f2937",
          gray: "#111827"
        }
      }
    }
  },
  plugins: []
}
