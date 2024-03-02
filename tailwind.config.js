/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blueBase : '#0f1a43',
        blueLightBase : '#e4eaff',
        blueDarkBase : '#0a112f',
        grayLightBase: '#45474B',
        grayBase : 'f5f4f5'
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["winter"],
  },
}

