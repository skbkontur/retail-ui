import { css } from '../../lib/theming/Emotion';
import styles from './Select.module.less';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  placeholder(t: ITheme) {
    return css`
      color: ${t.sltPlaceholderColor};
    `;
  },

  arrow(t: ITheme) {
    return css`
      .${styles.arrowWrap} & {
        border: 4px solid transparent;
        border-bottom-width: 0;
        border-top-color: ${t.btnMenuArrowColor};
      }
    `;
  },
};
