/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'main-bg' : '#f1f1f1', 
        'brand' : 'orange'
      }, 

      fontSize : {
        'logo' : '34px', 
        'h1' : '24px', 
        'h2' : '20px', 
        'normal' : '16px', 
        'small' : '14px', 
        'mini' : '12px'
      }, 

      borderRadius : {
        'card' : '20px', 
        'button' : '10px'
      }, 

      width : {
        'half' : '50%', 
        '45%' : '45%',
        '40%' : '40%', 
        '30%' : '30%',
      }
    },
  },
  plugins: [],
}
