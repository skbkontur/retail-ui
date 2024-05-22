module.exports = {
  core: {
    builder: 'webpack5',
    disableTelemetry: true,
  },
  addons: ['creevey'],
  stories: ['../stories/**/*.stories.tsx'],
  typescript: {
    check: false,
    reactDocgen: 'none',
  },
  features: {
    postcss: false,
  },
};
