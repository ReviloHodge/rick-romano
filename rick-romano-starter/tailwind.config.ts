import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#141b34',
        accent: '#ffd166'
      },
      borderRadius: { '2xl': '1.25rem' }
    }
  },
  plugins: [require('@tailwindcss/typography')]
} satisfies Config
