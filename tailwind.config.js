// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          gray: {
            900: '#0f172a',
            800: '#1e293b',
            700: '#334155',
            600: '#475569',
            500: '#64748b',
            400: '#94a3b8',
            300: '#cbd5e1',
            200: '#e2e8f0',
            100: '#f1f5f9',
          },
          green: {
            900: '#064e3b',
            800: '#065f46',
            700: '#047857',
            600: '#059669',
            500: '#10b981',
            400: '#34d399',
            300: '#6ee7b7',
            200: '#a7f3d0',
            100: '#d1fae5',
          }
        },
        fontFamily: {
          'mono': ['Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
        },
        animation: {
          'pulse-slow': 'pulse 3s linear infinite',
          'bounce-slow': 'bounce 2s infinite',
        }
      },
    },
    plugins: [],
  }