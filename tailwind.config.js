/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Paleta Bauhaus en frío: papel, tinta, azules y grises
      colors: {
        paper: '#E9ECEF',
        ink: '#111418',
        cobalt: '#2456C8',
        navy: '#15254A',
        steel: '#7D8A99',
        mist: '#C5CCD4',
        graphite: '#2B3139',
      },
      fontFamily: {
        sans: ['Jost', 'Futura', 'Century Gothic', 'sans-serif'],
      },
      boxShadow: {
        hard: '6px 6px 0 0 #111418',
        'hard-sm': '3px 3px 0 0 #111418',
        'hard-lg': '10px 10px 0 0 #111418',
      },
      keyframes: {
        'bh-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
      animation: {
        'bh-bounce': 'bh-bounce 0.9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
