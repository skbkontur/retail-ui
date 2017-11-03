// @flow
import * as React from 'react';

function withStyles(
  cssStyles: { [string]: string },
  jssStyles: { [string]: mixed } | (mixed => { [string]: mixed })
) {
  return (Component: React.ComponentType<*>) => {
    if (process.env.EXPERIMENTAL_CSS_IN_JS) {
      const theming = require('theming').default;
      const injectSheet = require('react-jss').default;
      const DefaultTheme = require('../theme').default;

      class WrappedComponent extends React.Component<*> {
        static contextTypes = theming.themeListener.contextTypes;

        render() {
          const isInThemeProvider = !!this.context[theming.channel];
          let passingStyles = jssStyles;
          if (typeof jssStyles === 'function' && !isInThemeProvider) {
            passingStyles = jssStyles(DefaultTheme);
          }
          const RenderingComponent = injectSheet(passingStyles)(Component);
          return <RenderingComponent {...this.props} />;
        }
      }

      return WrappedComponent;
    }

    return (props: *) => <Component {...props} classes={cssStyles} />;
  };
}

export default withStyles;
