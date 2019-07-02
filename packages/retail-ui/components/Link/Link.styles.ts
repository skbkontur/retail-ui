import { css } from '../../lib/theming/Emotion';
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
        color: ${t.linkDisabledColor};
        text-decoration: ${t.linkHoverTextDecoration};
      }
    `;
  },

  useGrayed(t: ITheme) {
    return css`
      color: ${t.linkDisabledColor};

      &:hover {
        color: ${t.linkDisabledColor};
        text-decoration-color: ${t.linkHoverTextDecoration};
      }
      &:active {
        color: ${t.linkDisabledColor};
      }
    `;
  },

  disabled(t: ITheme) {
    return css`
      .${styles.useDefault}& {
        color: ${t.linkDisabledColor};

        &:hover {
          color: ${t.linkDisabledColor};
        }
      }
      .${styles.useSuccess}& {
        color: ${t.linkDisabledColor};

        &:hover {
          color: ${t.linkDisabledColor};
        }
      }
      .${styles.useDanger}& {
        color: ${t.linkDisabledColor};

        &:hover {
          color: ${t.linkDisabledColor};
        }
      }
      .${styles.useGrayed}& {
        color: ${t.linkDisabledColor};

        &:hover {
          color: ${t.linkDisabledColor};
        }
      }
    `;
  },
};

export default jsStyles;
