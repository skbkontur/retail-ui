const baseConfig = require('./base.config');
const { components, VERSION_DIR } = require('../helpers');

const config = Object.assign({}, baseConfig, {
  styleguideDir: VERSION_DIR,
  components,
});

module.exports = config;
