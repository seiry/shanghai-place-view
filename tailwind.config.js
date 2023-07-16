// tailwind.config.js
module.exports = {
  // purge: [],
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake'],
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}
