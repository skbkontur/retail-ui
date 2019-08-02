module.exports = async (baseConfig, env) => {
  const { config } = baseConfig;

  config.module.rules = config.module.rules.filter(f => f.test.toString() !== '/\\.css$/');

  config.module.rules.push(
    {
      test: /\.tsx?$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    },
    {
      test: /\.css$/,
      use: [
        { loader: require.resolve('style-loader') },
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true
          }
        },
      ]
    },
    { test: /\.(jpe?g|png|gif|svg)$/i, use: [require.resolve('url-loader')] },
  );
  config.resolve = {
    extensions: [ '.tsx', '.ts', '.js', '.css']
  };

  return config;
};
