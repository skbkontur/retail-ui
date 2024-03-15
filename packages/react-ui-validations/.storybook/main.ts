module.exports = {
  core: { disableTelemetry: true },
  addons: ['creevey', 'creevey/preset/ie11'],
  stories: ['../stories/**/*.stories.tsx'],
  typescript: {
    check: false,
    reactDocgen: 'none',
  },
  features: {
    postcss: false,
  },
};
