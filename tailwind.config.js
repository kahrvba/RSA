/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626', // Red-600
          dark: '#B91C1C', // Red-700
        },
        text: {
          DEFAULT: '#000000',
          secondary: '#6B7280', // Gray-500
          inverse: '#FFFFFF',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9FAFB', // Gray-50
        },
        border: {
          DEFAULT: '#E5E7EB', // Gray-200
          dark: '#D1D5DB', // Gray-300
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
};