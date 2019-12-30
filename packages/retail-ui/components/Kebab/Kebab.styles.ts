import { css } from '../../lib/theming/Emotion';
import styles from './Kebab.module.less';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  focused(t: Theme) {
    return css`
      .${styles.kebab}& {
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  menu(t: Theme) {
    return css`
      border-radius: ${t.popupBorderRadius};
    `;
  },
};
