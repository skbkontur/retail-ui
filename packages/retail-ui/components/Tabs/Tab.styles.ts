import { css } from 'emotion';
import ColorFunctions from '../../lib/styles/ColorFunctions';
import styles from './Tab.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      &:hover {
        border-bottom: 3px solid ${t.tabColorHover};
      }
    `;
  },

  vertical(t: ITheme) {
    return css`
      .${styles.root}&:hover {
        border-left: 3px solid ${t.tabColorHover};
      }
    `;
  },

  focus(t: ITheme) {
    return css`
      border: 2px solid ${t.tabColorFocus};
    `;
  },

  disabled(t: ITheme) {
    return css`
      color: rgba(
        ${ColorFunctions.red(t.textColorDefault)},
        ${ColorFunctions.green(t.textColorDefault)},
        ${ColorFunctions.blue(t.textColorDefault)},
        0.5
      );
    `;
  },

  primary(t: ITheme) {
    return css`
      &:hover {
        border-bottom: 3px solid ${ColorFunctions.lighten(t.tabColorPrimary, '25%')};
      }
    `;
  },

  success(t: ITheme) {
    return css`
      &:hover {
        border-bottom: 3px solid ${ColorFunctions.lighten(t.tabColorSuccess, '25%')};
      }
    `;
  },

  warning(t: ITheme) {
    return css`
      &:hover {
        border-bottom: 3px solid ${ColorFunctions.lighten(t.tabColorWarning, '25%')};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      &:hover {
        border-bottom: 3px solid ${ColorFunctions.lighten(t.tabColorError, '25%')};
      }
    `;
  },
};

export default jsStyles;
