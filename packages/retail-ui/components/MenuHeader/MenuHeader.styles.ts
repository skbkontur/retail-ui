import { css } from '../../lib/theming/Emotion';
import styles from './MenuHeader.module.less';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  withLeftPadding(t: ITheme) {
    return css`
      .${styles.root}& {
        padding-left: ${t.menuItemPaddingForIcon};
      }
    `;
  },
};
