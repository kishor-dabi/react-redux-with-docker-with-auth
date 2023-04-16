module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
    theme: {
        screens: {
            'sm': '540px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {},
    },
    darkMode: 'class',
    plugins: [require('@tailwindcss/forms')]
}