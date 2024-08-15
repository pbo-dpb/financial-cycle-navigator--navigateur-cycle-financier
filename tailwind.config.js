module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      gridColumnStart: {
        "13": "13",
      },
      gridColumnEnd: {
        "13": "13",
        "14": "14",
      },
    },
  },
  plugins: [],
}
