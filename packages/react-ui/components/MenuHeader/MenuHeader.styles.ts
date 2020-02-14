import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import styles from './MenuHeader.module.less';

export const jsStyles = {
  withLeftPadding(t: Theme) {
    return css`
      .${styles.root}& {
        padding-left: ${t.menuItemPaddingForIcon};
      }
    `;
  },
};
