/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#63a4ff',  // Blue 400
                    DEFAULT: 'rgb(29, 78, 216)', // Blue 600
                    dark: '#004ba0',    // Blue 900
                }
            },
        },
    },
    plugins: [],
    safelist: [
    ],
}

