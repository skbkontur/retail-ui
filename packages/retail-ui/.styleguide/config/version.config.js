const baseConfig = require('./base.config');
const { commonSections, VERSION_DIR, removeUnsupportedConfigOptions } = require('../helpers');

const config = Object.assign({}, baseConfig, {
  styleguideDir: VERSION_DIR,
  sections: commonSections.filter(({ name }) => ['LocaleProvider', 'ThemeProvider', 'Components'].includes(name)),
});

module.exports = removeUnsupportedConfigOptions(config);
