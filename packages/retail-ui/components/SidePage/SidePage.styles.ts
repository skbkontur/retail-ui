import { css } from '../../lib/theming/Emotion';
import styles from './SidePage.module.less';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  overlay() {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    `;
  },

  container(t: ITheme) {
    return css`
      background: ${t.bgDefault};
    `;
  },

  shadow(t: ITheme) {
    return css`
      .${styles.container}& {
        box-shadow: ${t.sidePageContainerShadow};
      }
    `;
  },

  close(t: ITheme) {
    return css`
      color: ${t.sidePageCloseButtonColor};

      &:hover {
        color: ${t.sidePageCloseButtonHoverColor};
      }
    `;
  },

  panel(t: ITheme) {
    return css`
      .${styles.footerContent}& {
        background: ${t.sidePageFooterPanelBg};
      }
      .${styles.footerContent}.${styles.fixed}& {
        background: ${t.sidePageFooterPanelBg};
      }
    `;
  },

  fixed(t: ITheme) {
    return css`
      .${styles.header}& {
        background: ${t.bgDefault};
        box-shadow: 0 1px ${t.borderColorGrayLight};
      }
      .${styles.footerContent}& {
        background: ${t.bgDefault};
        border-top: 1px solid ${t.borderColorGrayLight};
      }
    `;
  },
};

export default jsStyles;
