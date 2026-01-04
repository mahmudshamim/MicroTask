/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F172A', // Dark Blue
                secondary: '#1E293B', // Slightly lighter dark blue for cards
                accent: '#10B981', // Teal/Green for buttons/highlights
                'accent-hover': '#059669',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Assuming Inter or similar used
            }
        },
    },
    plugins: [],
}
