const { commonSections, VERSION_DIR, removeUnsupportedConfigOptions } = require('../helpers');

const baseConfig = require('./base.config');

const config = Object.assign({}, baseConfig, {
  styleguideDir: VERSION_DIR,
  sections: commonSections.filter(({ name }) =>
    ['Mobiles', 'LocaleContext', 'Customization', 'Components'].includes(name),
  ),
});

module.exports = removeUnsupportedConfigOptions(config);
