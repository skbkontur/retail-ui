import { css } from 'emotion';
import styles from './Link.less';
import { ITheme } from '../../lib/ThemeManager';

const jsStyles = {
  useDefault(t: ITheme) {
    return css`
      color: ${t.linkColor};

      &:hover {
        color: ${t.linkColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkActiveColor};
      }
    `;
  },

  focus(t: ITheme) {
    return css`
      .${styles.useDefault}& {
        color: ${t.linkColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }
      .${jsStyles.useSuccess(t)}& {
        text-decoration: ${t.linkHoverTextDecoration};
      }
      .${jsStyles.useDanger(t)}& {
        text-decoration: ${t.linkHoverTextDecoration};
      }
      .${styles.useGrayed}& {
        color: ${t.textColorDisabled};
        text-decoration: ${t.linkHoverTextDecoration};
      }
    `;
  },

  useSuccess(t: ITheme) {
    return css`
      &:hover {
        text-decoration: ${t.linkHoverTextDecoration};
      }
    `;
  },

  useDanger(t: ITheme) {
    return css`
      &:hover {
        text-decoration: ${t.linkHoverTextDecoration};
      }
    `;
  },

  useGrayed(t: ITheme) {
    return css`
      color: ${t.textColorDisabled};

      &:hover {
        color: ${t.textColorDisabled};
        text-decoration: ${t.linkHoverTextDecoration};
      }
      &:active {
        color: ${t.textColorDisabled};
      }
    `;
  },

  disabled(t: ITheme) {
    return css`
      .${styles.useDefault}& {
        color: ${t.textColorDisabled};

        &:hover {
          text-decoration: none;
          color: ${t.textColorDisabled};
        }
      }
      .${jsStyles.useSuccess(t)}& {
        color: ${t.textColorDisabled};

        &:hover {
          text-decoration: none;
          color: ${t.textColorDisabled};
        }
      }
      .${jsStyles.useDanger(t)}& {
        color: ${t.textColorDisabled};

        &:hover {
          text-decoration: none;
          color: ${t.textColorDisabled};
        }
      }
      .${styles.useGrayed}& {
        color: ${t.textColorDisabled};

        &:hover {
          text-decoration: none;
          color: ${t.textColorDisabled};
        }
      }
    `;
  },
};

export default jsStyles;
