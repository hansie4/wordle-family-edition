/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#93c5fd",

                    secondary: "#fed7aa",

                    accent: "#818cf8",

                    neutral: "#fecdd3",

                    "base-100": "#ffffff",

                    info: "#e0f2fe",

                    success: "#bbf7d0",

                    warning: "#fef08a",

                    error: "#f87171",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
