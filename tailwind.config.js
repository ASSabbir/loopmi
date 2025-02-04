import daisyui from './node_modules/daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'color1':'#cce7d6',
        'color2':'#afe5cf',
        'color3':'#a4cab1',
        'color4':'#92c9a9',
        'color5':'#5f9877',
        'color6':'#0c2b23',
      }
    },
    fontFamily:{
      'Montserrat': '"Montserrat", serif',
      'Poppins': '"Poppins", serif',
      'Open_Sans': '"Open Sans", serif',
      'Work_Sans': '"Work Sans", serif'
    }
  },
  plugins: [daisyui],
}

