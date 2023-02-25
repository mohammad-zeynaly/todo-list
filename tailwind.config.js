/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  //content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      gilroy : ['gilroy-Regular','gilroy-Medium','gilroy-bold']
    },
    extend: {
      container:{
        center: true,
      }
    },
  },
  plugins: [],
}
