import { css } from 'emotion';
import styles from './MenuHeader.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  withLeftPadding(t: ITheme) {
    return css`
      .${styles.root}& {
        padding-left: ${t.menuItemPaddingForIcon};
      }
    `;
  },
};

export default jsStyles;
