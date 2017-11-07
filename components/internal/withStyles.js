// @flow
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import type { HigherOrderComponent } from 'react-flow-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

let defaultTheme;

export type RequiredProps = {
  innerRef: (*) => void
};

export type InjectedProps = { classes: { [string]: string } };

function withStyles(
  cssStyles: { [string]: string },
  jssStyles: { [string]: mixed }
): HigherOrderComponent<RequiredProps, InjectedProps> {
  return function(Component: any): any {
    if (process.env.EXPERIMENTAL_CSS_IN_JS) {
      const { create } = require('jss');
      const preset = require('jss-preset-default').default;
      const theming = require('theming').default;
      const createDefaultTheme = require('../theme').default;
      const brcast = require('brcast');

      const jss = create(preset());

      const createStyles =
        typeof jssStyles === 'function' ? jssStyles : theme => jssStyles;

      const getDefaultTheme = () => {
        if (!defaultTheme) {
          defaultTheme = createDefaultTheme();
        }
        return defaultTheme;
      };

      class Styled extends React.Component<RequiredProps> {
        static contextTypes = {
          [theming.channel]: PropTypes.object
        };

        _sheetsManager = new Map();
        _unsubscribeId = null;
        _theme = null;
        _broadcast = brcast();

        get _inThemeContext() {
          return !!this.context[theming.channel];
        }

        constructor(props, context) {
          super(props, context);
          this._theme = this._getThemeFromContext() || getDefaultTheme();
        }

        componentWillMount() {
          this._attach(this._theme);
        }

        componentDidMount() {
          if (this._inThemeContext) {
            // TODO: replace `this.context[theming.channel].subscribe`
            // with custom themeListener.subscribe
            this._unsubscribeId = this.context[
              theming.channel
            ].subscribe(theme => {
              const oldTheme = this._theme;
              this._theme = theme;
              this._attach(this._theme);
              this.forceUpdate(() => {
                this._detach(oldTheme);
              });
            });
          }
        }

        componentWillUnmount() {
          this._detach(this._theme);
          if (this._unsubscribeId !== null) {
            // TODO: replace `this.context[theming.channel].unsubscribe`
            // with custom themeListener.unsubscribe
            this.context[theming.channel].unsubscribe(this._unsubscribeId);
          }
        }

        _getThemeFromContext = () =>
          this.context[theming.channel] &&
          this.context[theming.channel].getState();

        _attach = theme => {
          let sheetManager = this._sheetsManager.get(createStyles);
          if (!sheetManager) {
            sheetManager = new Map();
            this._sheetsManager.set(createStyles, sheetManager);
          }
          let sheetManagerTheme = sheetManager.get(theme);

          if (!sheetManagerTheme) {
            sheetManagerTheme = {
              refs: 0,
              sheet: (null: *)
            };
            sheetManager.set(theme, sheetManagerTheme);
          }

          if (sheetManagerTheme.refs === 0) {
            const styles = createStyles(theme);
            const sheet = jss.createStyleSheet(styles);
            sheetManagerTheme.sheet = sheet;
            sheet.attach();
          }

          sheetManagerTheme.refs += 1;
        };

        _detach = theme => {
          const sheetManager = this._sheetsManager.get(createStyles);
          if (!sheetManager) {
            throw new Error('sheetManager is not defined');
          }
          const sheetManagerTheme = sheetManager.get(theme);
          if (!sheetManagerTheme) {
            throw new Error('sheetManagerTheme is not defined');
          }
          sheetManagerTheme.refs -= 1;

          if (sheetManagerTheme.refs === 0) {
            sheetManager.delete(theme);
            if (!sheetManagerTheme.sheet) {
              throw new Error('No StyleSheets in sheetManagerTheme');
            }
            jss.removeStyleSheet(sheetManagerTheme.sheet);
          }
        };

        render() {
          const sheetManager = this._sheetsManager.get(createStyles);
          if (!sheetManager) {
            throw new Error('sheetManager is not defined');
          }
          const sheetManagerTheme = sheetManager.get(this._theme);
          if (!sheetManagerTheme) {
            throw new Error('sheetManagerTheme is not defined');
          }
          if (!sheetManagerTheme.sheet) {
            throw new Error('No StyleSheets in sheetManagerTheme');
          }
          const { classes } = sheetManagerTheme.sheet;
          const { innerRef, ...rest } = this.props;
          return <Component {...rest} classes={classes} ref={innerRef} />;
        }

        // _ref = inst => {
        //   hoistNonReactProps(inst, this);
        // };
      }

      hoistNonReactStatics(Styled, Component);

      if (process.env.NODE_ENV !== 'production') {
        Styled.displayName = `withStyles(${Component.displayName ||
          'unknown'})`;
      }

      return Styled;
    }

    class Styled extends React.Component<RequiredProps> {
      render() {
        const { innerRef, ...rest } = this.props;
        return <Component {...rest} classes={cssStyles} ref={innerRef} />;
      }

      // _ref = inst => {
      //   hoistNonReactProps(inst, this);
      // };
    }

    hoistNonReactStatics(Styled, Component);

    if (process.env.NODE_ENV !== 'production') {
      Styled.displayName = `withStyles(${Component.displayName || 'unknown'})`;
    }

    return Styled;
  };
}

export default withStyles;

// function hoistNonReactProps(source, target) {
//   Object.getOwnPropertyNames(Object.getPrototypeOf(source)).forEach(key => {
//     if (key in target || key.startsWith('component')) {
//       return;
//     }
//     // $FlowIgnore
//     target[key] =
//       typeof source[key] === 'function'
//         ? source[key].bind(source)
//         : source[key];
//   });
// }
