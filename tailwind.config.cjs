// tailwind.config.cjs
module.exports = {
    content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                display: ['Iceberg', 'serif'],
                body: ['Overpass', 'serif'],
            },
            colors: {
                primaryColor: '#DA9252',
                primaryColorDark: '#E38A3B',
                secondaryColor: '#968154',
                secondaryColorDark: '#766542',
                tertiaryColor: '#5C6D7F',
                tertiaryColorDark: '#45515F',
                replicant: {
                    50: '#F8FAFC',
                    100: '#F1F5F8',
                    200: '#E2E6E9',
                    300: '#E4ECDF',
                    400: '#89919A',
                    500: '#4C5661',
                    600: '#313A45',
                    700: '#262626',
                    800: '#2A2A2A',
                    900: '#161616',
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
