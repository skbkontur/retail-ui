const path = require("path");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("ts-loader"),
    options: {
      configFile: path.resolve(__dirname, "../prod.tsconfig.json")
    }
  });

  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
