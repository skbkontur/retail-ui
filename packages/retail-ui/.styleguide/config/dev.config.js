const baseConfig = require('./base.config');
const { commonSections, ROOT_DIR } = require('../helpers');

const config = Object.assign({}, baseConfig, {
  styleguideDir: ROOT_DIR,
  components: [],
  sections: commonSections,
});

module.exports = config;
