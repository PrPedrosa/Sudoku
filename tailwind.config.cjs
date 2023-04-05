/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "blue-gradient": "linear-gradient(90deg, rgba(20,20,82,1) 0%, rgba(50,56,150,1) 47%, rgba(20,20,82,1) 100%, rgba(0,69,9,1) 100%);"
      },
      boxShadow:{
        "progress-bar" : "0px 2px 4px rgba(224, 165, 92, 0.3)",
        "board":"0px 2px 4px #282b30",
        "button-easy":"1px 2px 4px rgba(21, 128, 61, 1)",
        "button-medium":"1px 2px 4px rgba(234, 88, 12, 1)",
        "button-hard":"1px 2px 4px rgba(185, 28, 28, 1)",
        "button-back":"1px 1px 1px rgba(153, 27, 27, 1)",
      },
      colors:{
        c:{
          dark1:"#1e2124",
          dark2:"#282b30",
          dark3:"#36393e",
          dark4:"#424549",
          purple:"#7289da"
        }
      },
      animation:{
      "go-back":"back 0.2s linear"
      },
      keyframes:{
        "back":{
          "0%": {
            fontSize:"40px"
          },
          "50%": {
            fontSize:"40px"
          },
          "100%": {
            fontSize:"40px"
          },
      }
      }
      
    },
  },
  plugins: [],
}
