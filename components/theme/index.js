// @flow

import text from './text';
import button from './button';
import common from './common';
import link from './link';

const createDefaultTheme = () => ({
  text,
  common,
  button,
  link
});

export type ITheme = {
  text: typeof text,
  common: typeof common,
  button: typeof button,
  link: typeof link
};

export default createDefaultTheme;
