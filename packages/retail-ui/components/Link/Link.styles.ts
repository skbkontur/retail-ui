import { css } from 'emotion';
import styles from './Link.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  useDefault(t: ITheme) {
    return css`
      color: ${t.linkColor};

      &:hover {
        color: ${t.linkHoverColor};
        text-decoration-color: ${t.linkHoverTextDecoration};
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
      .${styles.useSuccess}& {
        text-decoration: ${t.linkHoverTextDecoration};
      }
      .${styles.useDanger}& {
        text-decoration: ${t.linkHoverTextDecoration};
      }
      .${styles.useGrayed}& {
        color: ${t.textColorDisabled};
        text-decoration: ${t.linkHoverTextDecoration};
      }
    `;
  },

  useGrayed(t: ITheme) {
    return css`
      color: ${t.textColorDisabled};

      &:hover {
        color: ${t.textColorDisabled};
        text-decoration-color: ${t.linkHoverTextDecoration};
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
          color: ${t.textColorDisabled};
        }
      }
      .${styles.useSuccess}& {
        color: ${t.textColorDisabled};

        &:hover {
          color: ${t.textColorDisabled};
        }
      }
      .${styles.useDanger}& {
        color: ${t.textColorDisabled};

        &:hover {
          color: ${t.textColorDisabled};
        }
      }
      .${styles.useGrayed}& {
        color: ${t.textColorDisabled};

        &:hover {
          color: ${t.textColorDisabled};
        }
      }
    `;
  },
};

export default jsStyles;
