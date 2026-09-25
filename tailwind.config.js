/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Paleta estilo Fórmula 1 con el azul institucional IMCYC: carbón oscuro, degradado azul y blanco
      colors: {
        paper: '#15151E',
        ink: '#FFFFFF',
        surface: '#1F1F27',
        cobalt: '#1A56DB',
        navy: '#233876',
        steel: '#949498',
        mist: '#38383F',
        graphite: '#1F1F27',
        sky: '#3F83F8', // azul claro IMCYC, para texto azul sobre fondo oscuro
        orchid: '#949498',
      },
      // "ink" es texto blanco, pero como fondo y borde necesita tonos oscuros
      backgroundColor: {
        ink: '#0F0F16',
      },
      borderColor: {
        ink: '#38383F',
      },
      fontFamily: {
        sans: ['Jost', 'Futura', 'Century Gothic', 'sans-serif'],
      },
      boxShadow: {
        hard: '0 8px 24px -12px rgba(0, 0, 0, 0.6)',
        'hard-sm': '0 0 0 3px rgba(26, 86, 219, 0.4)',
        'hard-lg': '0 18px 36px -18px rgba(0, 0, 0, 0.85)',
      },
      keyframes: {
        'bh-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'bh-aparecer': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'bh-bounce': 'bh-bounce 0.9s ease-in-out infinite',
        'bh-aparecer': 'bh-aparecer 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
