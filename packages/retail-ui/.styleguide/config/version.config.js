const baseConfig = require('./base.config');
const { components, VERSION_DIR, removeUnsupportedConfigOptions } = require('../helpers');

const config = Object.assign({}, baseConfig, {
  styleguideDir: VERSION_DIR,
  components,
});

module.exports = removeUnsupportedConfigOptions(config);
