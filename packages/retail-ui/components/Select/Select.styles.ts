import { css } from '../../lib/theming/Emotion';
import styles from './Select.module.less';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  placeholder(t: Theme) {
    return css`
      color: ${t.sltPlaceholderColor};
    `;
  },

  arrow(t: Theme) {
    return css`
      .${styles.arrowWrap} & {
        border: 4px solid transparent;
        border-bottom-width: 0;
        border-top-color: ${t.btnMenuArrowColor};
      }
    `;
  },
};
