// @flow
/* eslint-disable flowtype/no-weak-types */
import hoistNonReactStatics from 'hoist-non-react-statics';

type Props<T, C> = { innerRef?: (React.ElementRef<C> | null) => void } & T;

function withStyles(
  cssStyles: { [string]: string },
  jssStyles: { [string]: mixed }
) {
  return function<T: {}, C: Class<React.Component<T>>>(Component: C) {
    let Styled: React.ComponentType<Props<T, C>>;
    if (process.env.EXPERIMENTAL_CSS_IN_JS) {
      const jssStyledFactory = require('./jssStyledFactory').default;
      Styled = jssStyledFactory(Component, jssStyles);
    } else {
      const cssStyledFactory = require('./cssStyledFactory').default;
      Styled = cssStyledFactory(Component, cssStyles);
    }

    hoistNonReactStatics(Styled, Component);

    if (process.env.NODE_ENV !== 'production') {
      Styled.displayName = `withStyles(${Component.displayName || 'unknown'})`;
    }

    return Styled;
  };
}

export default withStyles;
