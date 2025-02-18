/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "index.html"],
  theme: {
    extend: {
        colors:{
            primary: {
                light:"hsl(148, 38%, 91%)",
                DEFAULT:"hsl(169, 82%, 27%)",
                dark:"hsl(171, 83%, 14%)",
                red:"hsl(0, 66%, 54%)"
            },
            neutral: {
                White:"hsl(0, 0%, 100%)",
                DEFAULT:"hsl(186, 15%, 59%)",
                darker:"hsl(187, 24%, 22%)",
            },
        },
        screens:{
            'max-375' : {'max':'375px'},
        }
    },
  },
  plugins: [],
};
