/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales
        'espresso-brown': 'var(--espresso-brown)',
        'library-green': 'var(--library-green)',
        'parchment-cream': 'var(--parchment-cream)',

        // Colores secundarios
        'warm-gray': 'var(--warm-gray)',
        'soft-taupe': 'var(--soft-taupe)',
        'rich-tan': 'var(--rich-tan)',

        // Colores de hover
        'hover-brown': 'var(--hover-brown)',
        'hover-green': 'var(--hover-green)',
        'hover-gray': 'var(--hover-gray)',

        // Colores de texto
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-highlight': 'var(--text-highlight)',

        // Colores de fondo
        'background-main': 'var(--background-main)',
        'background-secondary': 'var(--background-secondary)',
        'background-dark': 'var(--background-dark)',

        // Colores de bordes
        'border-light': 'var(--border-light)',
        'border-dark': 'var(--border-dark)',

        // Colores de estado
        'success-green': 'var(--success-green)',
        'warning-amber': 'var(--warning-amber)',
        'error-red': 'var(--error-red)',

        // Colores de botones
        'button-primary-bg': 'var(--button-primary-bg)',
        'button-primary-text': 'var(--button-primary-text)',
        'button-secondary-bg': 'var(--button-secondary-bg)',
        'button-secondary-text': 'var(--button-secondary-text)',

        // Colores de sombras
        'shadow-light': 'var(--shadow-light)',
        'shadow-medium': 'var(--shadow-medium)',
        'shadow-dark': 'var(--shadow-dark)',
      },
      // Otros estilos personalizados que quieras agregar
    },
  },
  plugins: [],
};
