/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a1f44',
          blue: '#1e40af',
          red: '#dc2626',
          light: '#f3f4f6',
          accent: '#2563eb',
          somalia: '#4189DD', 
          somaliaLight: 'rgba(65, 137, 221, 0.08)'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        header: ['"Georgia"', 'serif'], // This is crucial for the 100% match
      },
      animation: {
        'scroll': 'scroll 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};