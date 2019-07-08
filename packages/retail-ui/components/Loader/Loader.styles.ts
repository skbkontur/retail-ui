import { css } from '../../lib/theming/Emotion';
import styles from './Loader.less';
import { ITheme } from '../../lib/theming/Theme';

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
