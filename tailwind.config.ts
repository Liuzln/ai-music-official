import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            colors: {
                accent: {
                    primary: '#6366f1',
                    secondary: '#a855f7',
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
}
