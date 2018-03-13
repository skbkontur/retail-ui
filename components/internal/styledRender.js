// @flow

import * as React from 'react';

import type { ITheme } from '../theme';

type JSSStyles<T> = {
  [$Keys<T>]: {},
  '@font-face'?: {},
  '@keyframes'?: {}
};

const styledElement = <T: {}>(
  cssStyles: T,
  jssStyles: (theme: ITheme) => JSSStyles<T>,
  render: (classes: T) => React$Node
) => {
  if (process.env.EXPERIMENTAL_CSS_IN_JS) {
    const JssStyled = require('./JssStyled').default;
    return <JssStyled styles={jssStyles} children={render} />;
  } else {
    return render(cssStyles);
  }
};

const styled = <T: {}>(
  cssStyles: T,
  jssStyles: (theme: ITheme) => JSSStyles<T>,
  render: (classes: T) => React$Node
) => () => styledElement(cssStyles, jssStyles, render);

styled.element = styledElement;

export default styled;
