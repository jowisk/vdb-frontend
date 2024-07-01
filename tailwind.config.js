// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // other paths to your source files
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': "url('/assets/bg1.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
