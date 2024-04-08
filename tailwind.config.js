/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-custom':
          'linear-gradient(307deg, rgba(74,125,139,1) 30%, rgba(196,241,253,1) 92%)',
      },
      fontFamily: {
        inter: ['Inter'],
      },
      colors: {
        customBlue: '#4A7D8B',
        constomBlueLight: '#40616a',
      },
      display: ['group-focus'],
    },
  },
  plugins: [
    require('tailwindcss/nesting'),
  ],
};
