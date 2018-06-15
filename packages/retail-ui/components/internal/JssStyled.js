
import * as React from 'react';
import PropTypes from 'prop-types';
import { create } from 'jss';
import preset from 'jss-preset-default';
import theming from 'theming';
import createDefaultTheme from '../theme';
import brcast from 'brcast';

const jss = create(preset());

type Styles = { [string]: mixed } | ((theme: ?{}) => { [string]: mixed });

let counter = Number.MAX_SAFE_INTEGER;

let defaultTheme;
const getDefaultTheme = () => {
  if (!defaultTheme) {
    defaultTheme = createDefaultTheme();
  }
  return defaultTheme;
};

type Props = {
  styles: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  children: (classes: any) => React.Node
};

const createStylesCreator = (styles: Styles) =>
  typeof styles === 'function' ? styles : (theme: mixed) => styles;

class JssStyled extends React.Component<Props> {
  static contextTypes = {
    [theming.channel]: PropTypes.object
  };

  static _sheetsManager = new Map();
  _unsubscribe = null;
  _theme = null;
  _broadcast = brcast();
  _stylesCreator;

  get _inThemeContext() {
    return !!this.context[theming.channel];
  }

  constructor(props: Props, context: mixed) {
    super(props, context);
    this._theme = this._getThemeFromContext() || getDefaultTheme();

    // styles passes onlu once
    // so there is no need to create new _stylesCreator on
    // props updates
    this._stylesCreator = createStylesCreator(props.styles);
  }

  componentWillMount() {
    this._attach(this._theme);
  }

  componentDidMount() {
    if (this._inThemeContext) {
      this._unsubscribe = this.context[theming.channel].subscribe(theme => {
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
    if (this._unsubscribe !== null) {
      this._unsubscribe();
    }
  }

  _getThemeFromContext = () =>
    this.context[theming.channel] && this.context[theming.channel].getState();

  _attach = theme => {
    let sheetManager = JssStyled._sheetsManager.get(this._stylesCreator);

    if (!sheetManager) {
      sheetManager = new Map();
      JssStyled._sheetsManager.set(this._stylesCreator, sheetManager);
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
      const styles = this._stylesCreator(theme);
      let sheet;
      if (process.env.NODE_ENV === 'production') {
        sheet = jss.createStyleSheet(styles);
      } else {
        sheet = jss.createStyleSheet(styles, {
          generateClassName: this._generateClassName
        });
      }

      sheetManagerTheme.sheet = sheet;
      sheet.attach();
    }

    sheetManagerTheme.refs += 1;
  };

  _generateClassName = rule => {
    const name =
      typeof this.props.styles === 'function' ? this.props.styles.name : '';
    return `${name}-${rule.key}-${(counter++).toString(36)}`;
  };

  _detach = theme => {
    const sheetManager = JssStyled._sheetsManager.get(this._stylesCreator);
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
    const sheetManager = JssStyled._sheetsManager.get(this._stylesCreator);
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
    return this.props.children(classes);
  }
}

export default JssStyled;
