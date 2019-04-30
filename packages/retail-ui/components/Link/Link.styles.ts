import { css } from 'emotion';
import styles from './Link.less';
import { ITheme } from '../../lib/ThemeManager';

const jsStyles = {
  useDefault(t: ITheme) {
    return css`
      color: ${t.linkColor};

      &:hover {
        color: ${t.linkColor};
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
      color: ${t.linkColorSuccess};

      &:hover {
        color: ${t.linkColorSuccess};
        text-decoration-color: ${t.linkHoverColorSuccess};
      }
      &:active {
        color: ${t.linkActiveColorSuccess};
      }
    `;
  },

  useDanger(t: ITheme) {
    return css`
      color: ${t.linkColorDanger};

      &:hover {
        color: ${t.linkColorDanger};
        text-decoration-color: ${t.linkHoverColorDanger};
      }
      &:active {
        color: ${t.linkActiveColorDanger};
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
      .${jsStyles.useSuccess(t)}& {
        color: ${t.textColorDisabled};

        &:hover {
          color: ${t.textColorDisabled};
        }
      }
      .${jsStyles.useDanger(t)}& {
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
