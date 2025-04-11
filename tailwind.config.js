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
        primary: "#FF540A",
        secondary: "#FF5E19",
        gray: {
          DEFAULT: '#EEEDF4',
          light: '#F8F7FA',
          50: "#FAFAFA",
          200: "#EAEAEA",
          300: "#7C7C7C",
          600: "#718096",
          800: "#232B38",
          700: "#2A313C",
          900: "#1A202C",
        },
        accent: "#FF4747",
        neutral: "#F5F5DC",
        blueLogo: "#005DB4",
        orangeLightLogo: "#FF7033",
        blueDarkLogo: "#1C334A",
        yellowLogo: "#FCC400",
        grayLogo:"#7C7C7C",
        info: "#005DB4",
        success: "#8FBC8F",
        warning: "#FFC107",
        error: "#C72C41",
        buttons: "#FF540A", 
        buttonsHover: "#FF9257",   

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
