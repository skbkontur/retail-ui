import { css } from '../../lib/theming/Emotion';
import styles from './MenuHeader.module.less';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  withLeftPadding(t: Theme) {
    return css`
      .${styles.root}& {
        padding-left: ${t.menuItemPaddingForIcon};
      }
    `;
  },
};
