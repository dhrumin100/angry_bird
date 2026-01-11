/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RoadScan Gold Theme
        'gold': {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8dcc8',
          300: '#d4c4a8',
          400: '#c9a962',
          500: '#b8944d',
          600: '#a07f3d',
          700: '#8b7355',
          800: '#5c4f3d',
          900: '#2c2416',
        },
        'cream': '#faf8f5',
        'beige': '#f5f0e8',
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 169, 98, 0.35)',
        'elegant': '0 10px 40px rgba(44, 36, 22, 0.08)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
