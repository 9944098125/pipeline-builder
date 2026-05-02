/* CRA's webpack sets postcssOptions.config=false and injects tailwindcss when tailwind.config.js exists.
   This file is not used by react-scripts; Tailwind still runs. Keep for tooling/IDE or future CRACO. */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
