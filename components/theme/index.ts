import text from './text';
import button from './button';
import common from './common';
import link from './link';

const createDefaultTheme = (): ITheme => ({
  text,
  common,
  button,
  link
});

export interface ITheme {
  readonly text: typeof text;
  readonly common: typeof common;
  readonly button: typeof button;
  readonly link: typeof link;
}

export default createDefaultTheme;
