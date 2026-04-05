/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#1c1c1f',
          light: '#f7f4ec',
          sidebar: '#2a2a2d',
        },
        card: {
          green: '#b2d7b6',
          yellow: '#f3d274',
          purple: '#9da2fa',
          white: '#ffffff',
          dark: '#2c2c2f',
          darker: '#222225'
        },
        text: {
          main: '#2d2d2d',
          muted: '#8e8e8e',
          darkMain: '#f0f0f0',
          darkMuted: '#9aa0a6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
