//const { default: plugin } = require('tailwindcss');
const plugin = require("tailwindcss/plugin")

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
        "board":"0px 2px 4px #282b30",
        "button-easy":"1px 2px 4px rgba(21, 128, 61, 1)",
        "button-medium":"1px 2px 4px rgba(234, 88, 12, 1)",
        "button-hard":"1px 2px 4px rgba(185, 28, 28, 1)",
        "button-back":"1px 1px 1px rgba(153, 27, 27, 1)",
        "button-purple":"1px 1px 1px #7289da",
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
        intro: "intro 1.5s ease-in-out",
        intro2: "intro2 1.5s ease-in"
      },
      keyframes:{
        intro:{
          "0%":{
            fontSize: "0px",
            padding: "0px 0px 200px 0px",
            opacity: 0
          },
          "100%":{
            fontSize: "30px",
            padding: "0px 0px 0px 0px",
            opacity: 1
          }
        },

        intro2:{
          "0%":{
            minWidth: "0px",
            width: "0px",
            fontSize: "0px",
            opacity: 0
          },
          "100%":{
            minWidth: "80px",
            fontSize: "5px",
            opacity: 1
          }
        }
      }
      
    },
  },
  plugins: [],
}

/* function componentsPlugin(){
  return plugin(function ({addComponents, theme}) {
    addComponents({
      ".opts-button":{} 
    })
  })  
} */