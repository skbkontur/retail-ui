import { css } from '../../lib/theming/Emotion';
import styles from './Token.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  warning(t: ITheme) {
    return css`
      .${styles.token}& {
        border: 1px solid ${t.borderColorWarning};
        box-shadow: 0 0 0 1px ${t.borderColorWarning};
      }
    `;
  },

  error(t: ITheme) {
    return css`
      .${styles.token}& {
        border: 1px solid ${t.borderColorError};
        box-shadow: 0 0 0 1px ${t.borderColorError};
      }
    `;
  },
};

export default jsStyles;
