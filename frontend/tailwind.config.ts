import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enables `dark:` class support
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: '#4ea6a9',
        'primary-light': '#6fc1c3',
        'primary-dark': '#3d8587',
        crimson: '#DC143C',

        // Theme Colors
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          text: '#E0E0E0',
        },
        light: {
          bg: '#ffffff',
          surface: '#f8f9fa',
          text: '#1f2937',
        },
      },

      fontFamily: {
        sans: ['var(--font-Poppins)', 'sans-serif'],
        heading: ['var(--font-Josefin)', 'sans-serif'],
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
        card: '0 4px 16px rgba(0, 0, 0, 0.1)',
      },

      screens: {
        '400px': '400px',
        '600px': '600px',
        '800px': '800px',
        '1000px': '1000px',
        '1100px': '1100px',
        '1200px': '1200px',
        '1300px': '1300px',
        '1500px': '1500px',
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },

      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

export default config
