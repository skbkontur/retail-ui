import { css } from 'emotion';
import styles from './Loader.less';
import { ITheme } from '../../lib/ThemeManager';

const jsStyles = {
  active(t: ITheme) {
    return css`
      .${styles.loader}&::after {
        background: ${t.loaderBg};
        opacity: ${t.loaderOpacity};
      }
    `;
  },
};

export default jsStyles;
