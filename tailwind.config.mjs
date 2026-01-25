/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Stripe-inspired color palette
        stripe: {
          purple: '#635bff',
          'purple-light': '#7a73ff',
          'purple-dark': '#4f46e5',
          cyan: '#00d4ff',
          pink: '#ff80b5',
          blue: '#0a2540',
          'blue-light': '#425466',
          gray: '#f6f9fc',
        },
      },
      backgroundImage: {
        'stripe-gradient': 'linear-gradient(135deg, #635bff 0%, #00d4ff 50%, #ff80b5 100%)',
        'stripe-mesh': 'radial-gradient(at 40% 20%, #635bff 0px, transparent 50%), radial-gradient(at 80% 0%, #00d4ff 0px, transparent 50%), radial-gradient(at 0% 50%, #ff80b5 0px, transparent 50%)',
        'dark-gradient': 'linear-gradient(180deg, #0a2540 0%, #1a1a2e 100%)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 20px rgba(99, 91, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 91, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
