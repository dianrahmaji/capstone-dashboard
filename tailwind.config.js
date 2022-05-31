module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#073C64',
        secondary: '#FDCB2C',
        accent: '#1A2C43'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
