import { css } from '../../lib/theming/Emotion';
import styles from './Select.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  placeholder(t: ITheme) {
    return css`
      color: ${t.sltPlaceholderColor};
    `;
  },

  arrow(t: ITheme) {
    return css`
      .${styles.arrowWrap} & {
        border-top-color: ${t.btnMenuArrowColor};
      }
    `;
  },
};

export default jsStyles;
