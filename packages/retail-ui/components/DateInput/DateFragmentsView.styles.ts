import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import styles from './DateFragmentsView.less';

const jsStyles = {
  root(t: ITheme) {
    return css`
      & ::selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
      & ::-moz-selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
    `;
  },

  mask(t: ITheme) {
    return css`
      color: ${t.dateInputMaskColor};
    `;
  },

  delimiter(t: ITheme) {
    return css`
      color: ${t.dateInputMaskColor};
      
      &.${styles.filled} {
        color: inherit;
        line-height: 1.34;
      }
      
    `;
  },
};

export default jsStyles;
