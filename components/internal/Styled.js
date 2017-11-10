// @flow

import * as React from 'react';
import JssStyled from './JssStyled';

type Props = {
  jssStyles: { [string]: mixed },
  cssStyles: { [string]: string },
  render: (classes: { [string]: string }) => React.Node
};

const Styled = ({ jssStyles, cssStyles, render }: Props) => {
  if (process.env.EXPERIMENTAL_CSS_IN_JS) {
    return <JssStyled styles={jssStyles} children={render} />;
  } else {
    return render(cssStyles);
  }
};

export default Styled;
