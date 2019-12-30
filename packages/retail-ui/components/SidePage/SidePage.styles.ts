import { css } from '../../lib/theming/Emotion';
import styles from './SidePage.module.less';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  container(t: Theme) {
    return css`
      background: ${t.bgDefault};
    `;
  },

  shadow(t: Theme) {
    return css`
      .${styles.container}& {
        box-shadow: ${t.sidePageContainerShadow};
      }
    `;
  },

  close(t: Theme) {
    return css`
      color: ${t.sidePageCloseButtonColor};

      &:hover {
        color: ${t.sidePageCloseButtonHoverColor};
      }
    `;
  },

  panel(t: Theme) {
    return css`
      .${styles.footerContent}& {
        background: ${t.sidePageFooterPanelBg};
      }
      .${styles.footerContent}.${styles.fixed}& {
        background: ${t.sidePageFooterPanelBg};
      }
    `;
  },

  fixed(t: Theme) {
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
