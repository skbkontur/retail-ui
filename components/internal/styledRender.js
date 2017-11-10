// @flow

import * as React from 'react';

const styled = (
  cssStyles: { [string]: string },
  jssStyles: { [string]: mixed },
  render: (classes: { [string]: string }) => React$Node
) => () => {
  if (process.env.EXPERIMENTAL_CSS_IN_JS) {
    const JssStyled = require('./JssStyled').default;
    return <JssStyled styles={jssStyles} children={render} />;
  } else {
    return render(cssStyles);
  }
};

export default styled;
