/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#C2185B",
                secondary_white: "#F9F9FF",
            },
            fontFamily: {
                roboto: "roboto",
                "roboto-med": "roboto-med",
                "roboto-bold": "roboto-bold",
            },
        },
    },
    plugins: [],
};
