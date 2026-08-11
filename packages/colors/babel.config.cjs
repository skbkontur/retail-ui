// using babel.config.js here as a workaround
// to enable processing files from react-ui
// that are outside of colors package
// @see https://stackoverflow.com/a/67235617

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: ["@babel/plugin-transform-runtime", ["@babel/plugin-proposal-decorators", { legacy: true }]],
};
