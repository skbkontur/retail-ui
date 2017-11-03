// @flow

import text from './text';
import button from './button';
import common from './common';
import link from './link';

const theme = {
  text,
  common,
  button,
  link
};

export type ITheme = typeof theme;

export default theme;
