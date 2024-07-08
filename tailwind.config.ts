import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1b84ff',
        'primary-hover': '#1770d9',
        'hero-background': '#e4f5ff',
        'text-dark': '#334155',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        move1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(-150px, -200px) rotate(-135deg)' },
        },
        move2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '35%, 65%': { transform: 'translate(-100px, 325px) rotate(-135deg)' },
          '50%': { transform: 'translate(25px, 400px) rotate(-45deg)' },
        },
        move3: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%, 75%': { transform: 'translate(-150px, -150px) rotate(-90deg)' },
          '50%': { transform: 'translate(0px, -300px) rotate(0deg)' },
        },
        move4: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%, 75%': { transform: 'translate(200px, -150px) rotate(-120deg)' },
          '50%': { transform: 'translate(300px, 0px) rotate(0deg)' },
        },
      },
      animation: {
        move1: 'move1 15s infinite linear',
        move2: 'move2 20s infinite linear',
        move3: 'move3 18s infinite linear',
        move4: 'move4 19s infinite linear',
      },
    },
  },
  plugins: [],
}
export default config
