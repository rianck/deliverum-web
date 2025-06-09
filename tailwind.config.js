/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        66: "66%",
        88: "88%",
        70: "70%",
        80: "80%",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "32px",
        "5xl": "48px",
      },
      colors: {      
        bodyApp: '#F5F5F5',        
        primary: "#EB5321",
        primary2: "#FF7C4D", 
        primary3: "#FFA270", 
        secondary: "#F6512C",                   
        blackLogo: {
          DEFAULT: '#0D0F11',
          70: "#191D23",
          50: "#323A46",
          30: "#6F7B8B",
          10: "#A0A8B3",
        },
        grayLogo: {
          DEFAULT: '#A0A8B3',
          70: "#C0C5CC",
          50: "#D0D5DD",
          30: "#E7EAEE",
          10: "#F7F8F9",
        },
        blueDarkLogo: {
          DEFAULT: '#0F2C66',
          70: "#1A418C",
          50: "#2D59B3",
          30: "#2D59B3",
          10: "#3392FF",
        },
        blueLightLogo: {
          DEFAULT: '#4D94FF',
          70: "#73AAFF",
          50: "#A6CAFF",
          30: "#CCE1FF",
          10: "#E6F0FF",
        },
        greenDarkLogo: {
          DEFAULT: '#134D28',
          70: "#1F8042",
          50: "#1DA64F",
          30: "#1FB355",
          10: "#41D979",
        },
        greenLightLogo: {
          DEFAULT: '#41D979',
          70: "#61F296",
          50: "#97FCBA",
          30: "#CAFCDA",
          10: "#DCFCE7",
        },
        yellowDarkLogo: {
          DEFAULT: '#F7AF07',
          70: "#FFB907",
          50: "#FFCC00",
          30: "#FFD633",
          10: "#FFDE59",
        },
        yellowLightLogo: {
          DEFAULT: '#FFDE59',
          70: "#FFE680",
          50: "#FFEDA6",
          30: "#FFF5CA",
          10: "#FFFCF0",
        },
      },
      letterSpacing: {
        tight: "-0.96px",
        40: "-0.4px",
      },
      borderRadius: {
        20: "20px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"),
    plugin(function ({ addVariant }) {
      addVariant("current", "&.active");
    }),
  ],
};
