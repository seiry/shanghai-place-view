// tailwind.config.js
module.exports = {
  // purge: [],
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake'],
  },
}
