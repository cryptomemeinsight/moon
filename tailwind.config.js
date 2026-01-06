/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'marker': ['"Permanent Marker"', 'cursive'],
        'hand': ['"Patrick Hand"', 'cursive'],
      },
      colors: {
        'paper': '#fdfbf7',
        'ink': '#2d2d2d',
        'scribble-blue': '#4d79ff',
        'scribble-pink': '#ff4d94',
        'scribble-yellow': '#ffeb3b',
        'scribble-green': '#4caf50',
      },
      boxShadow: {
        'sketch': '4px 4px 0px 0px #2d2d2d',
        'sketch-lg': '8px 8px 0px 0px #2d2d2d',
        'sketch-hover': '2px 2px 0px 0px #2d2d2d',
      },
      borderRadius: {
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
      }
    },
  },
  plugins: [],
}
