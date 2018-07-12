// tslint:disable-next-line:no-var-requires
const defaultTheme = require('./color_tokens.json');
// tslint:disable-next-line:no-var-requires
const flatTheme = require('../flat/color_tokens_flat.json');

const USE_FLAT_THEME = false;
export const getCommonTheme = () => {
  return USE_FLAT_THEME ? flatTheme : defaultTheme;
};
