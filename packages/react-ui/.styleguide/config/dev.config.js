const { commonSections, ROOT_DIR, removeUnsupportedConfigOptions } = require('../helpers');

const baseConfig = require('./base.config');

const config = Object.assign({}, baseConfig, {
  styleguideDir: ROOT_DIR,
  sections: commonSections,
});

module.exports = removeUnsupportedConfigOptions(config);
