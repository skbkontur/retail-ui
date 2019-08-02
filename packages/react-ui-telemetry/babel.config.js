module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/env',
      {
        targets: {
          browsers: ['last 3 chrome versions', 'last 3 firefox versions', 'ie 11', 'edge > 12', 'safari > 11.1'],
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
  ],
};
