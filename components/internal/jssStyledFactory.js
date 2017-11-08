// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type Styles = { [string]: mixed };

let defaultTheme;

type Props<T, C> = T & { innerRef?: (React.ElementRef<C> | null) => void };

export default function jssStyledFactory<T: {}, C: Class<React.Component<T>>>(
  Component: C,
  jssStyles: Styles
): Class<React.Component<Props<T, C>>> {
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

  return class Styled extends React.Component<
    T & { innerRef?: (React.ElementRef<C> | null) => void }
  > {
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

    constructor(props: Props<T, C>, context: mixed) {
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
        this._unsubscribeId = this.context[theming.channel].subscribe(theme => {
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
      this.context[theming.channel] && this.context[theming.channel].getState();

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
  };
}
