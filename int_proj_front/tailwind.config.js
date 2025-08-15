/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["corporate", "dracula"],
    darkTheme: "dracula",
    base:true,
    styled:true,
    utils:true,
    prefix: "",
    logs:true,
    themeRoot:":root",
}
}
