import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import styles from './DateFragmentsView.module.less';

export const jsStyles = {
  root(t: Theme) {
    return css`
      & ::selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
      & ::-moz-selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
    `;
  },

  mask(t: Theme) {
    return css`
      color: ${t.dateInputMaskColor};
    `;
  },

  delimiter(t: Theme) {
    return css`
      color: ${t.dateInputMaskColor};

      &.${styles.filled} {
        color: inherit;
        line-height: 1.34;
      }
    `;
  },
};
