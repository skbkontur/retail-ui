import * as React from 'react';
import PropTypes from 'prop-types';

function withStyles(cssStyles, jssStyles) {
  return function(Component) {
    if (process.env.EXPERIMENTAL_CSS_IN_JS) {
      const theming = require('theming').default;
      const injectSheet = require('react-jss').default;
      const DefaultTheme = require('../theme').default;

      class WrappedComponent extends React.Component<*> {
        static contextTypes = {
          [theming.channel]: PropTypes.object
        };

        render() {
          const isInThemeProvider = !!this.context[theming.channel];
          let passingStyles = jssStyles;
          if (typeof jssStyles === 'function' && !isInThemeProvider) {
            passingStyles = jssStyles(DefaultTheme);
          }
          const RenderingComponent = injectSheet(passingStyles)(Component);
          return <RenderingComponent {...this.props} innerRef={this._ref} />;
        }

        _ref = inst => {
          hoistNonReactProps(inst, this);
        };
      }

      return WrappedComponent;
    }

    return class WrappedComponent extends React.Component<*> {
      render() {
        return (
          <Component {...this.props} classes={cssStyles} innerRef={this._ref} />
        );
      }

      _ref = inst => {
        hoistNonReactProps(inst, this);
      };
    };
  };
}

export default withStyles;

function hoistNonReactProps(source, target) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(source)).forEach(key => {
    if (key in target || key.startsWith('component')) {
      return;
    }
    target[key] =
      typeof source[key] === 'function'
        ? source[key].bind(source)
        : source[key];
  });
}
