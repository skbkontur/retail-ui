import { css } from '../../lib/theming/Emotion';
import styles from './Kebab.module.less';
import { ITheme } from '../../lib/theming/Theme';

export const jsStyles = {
  focused(t: ITheme) {
    return css`
      .${styles.kebab}& {
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  menu(t: ITheme) {
    return css`
      border-radius: ${t.popupBorderRadius};
    `;
  },
};
