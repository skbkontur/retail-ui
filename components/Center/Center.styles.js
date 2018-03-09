// @flow

import type { ITheme } from '../theme/index';

export default (theme: ITheme) => ({
  root: {
    height: '100%'
  },

  spring: {
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'middle'
  },

  container: {
    display: 'inline-block',
    textAlign: 'left',
    verticalAlign: 'middle'
  }
});
