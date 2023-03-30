/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "loyalty-progress-bar" : "linear-gradient(90deg, #976635 0%, #E6AA5F 100%)"
      },
      boxShadow:{
        "progress-bar" : "0px 2px 4px rgba(224, 165, 92, 0.3)"
      },
      
    },
  },
  plugins: [],
}
