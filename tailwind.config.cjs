// tailwind.config.cjs
module.exports = {
    content: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
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
                    100: '#E4EBF1',
                    200: '#C9D7E3',
                    300: '#AFC3D5',
                    400: '#2A3C50',
                    500: '#233243',
                    600: '#1C2835',
                    700: '#151E28',
                    800: '#0E141B',
                    900: '#070A0D'
                }
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
};
