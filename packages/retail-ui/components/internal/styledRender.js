

import * as React from 'react';

import type { ITheme } from '../theme';

type JSSStyles<T> = {
  [$Keys<T>]: {},
  '@font-face'?: {},
  '@keyframes'?: {}
};

export const element = <T: {}>(
  cssStyles: T,
  jssStyles: (theme: ITheme) => JSSStyles<T>,
  render: (classes: T) => React$Node
) => {
  if (process.env.REACT_APP_EXPERIMENTAL_CSS_IN_JS) {
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
) => () => element(cssStyles, jssStyles, render);

styled.element = element;

export default styled;
