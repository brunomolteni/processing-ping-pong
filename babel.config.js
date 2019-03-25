module.exports = {
  presets: ["poi/babel"],
  plugins: [
    "react-hot-loader/babel",
    [
      "prismjs",
      {
        languages: ["java"],
        theme: "okaidia",
        css: true
      }
    ]
  ]
};
