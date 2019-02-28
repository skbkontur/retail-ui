// @ts-ignore: noUnusedLocals React
import React from 'react';
import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import { DefaultThemeType } from '../themes';

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<DefaultThemeType>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;

export const isTruthyProp = (propName: string) => (
  strings: TemplateStringsArray,
  ...values: Array<styledComponents.FlattenInterpolation<any>>
) => (props: { [prop: string]: any }) => {
  if (props[propName]) {
    return css(strings, ...values);
  }

  return '';
};
