import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import styles from './Kebab.module.less';

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
