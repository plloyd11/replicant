// tailwind.config.cjs
module.exports = {
    content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primaryColor: '#7E6E55',
                primaryColorDark: '#615542',
                secondaryColor: '#968154',
                secondaryColorDark: '#766542',
                tertiaryColor: '#5C6D7F',
                tertiaryColorDark: '#45515F',
                replicant: {
                    50: '#F8FAFC',
                    100: '#F1F5F8',
                    200: '#E2E6E9',
                    300: '#C5CCD3',
                    400: '#89919A',
                    500: '#4C5661',
                    600: '#313A45',
                    700: '#24303D',
                    800: '#16202C',
                    900: '#09121A',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
    ],
};
