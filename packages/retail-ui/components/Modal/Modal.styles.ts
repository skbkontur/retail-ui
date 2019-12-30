import { css } from '../../lib/theming/Emotion';
import styles from './Modal.module.less';
import { ITheme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const jsStyles = {
  bg(t: ITheme) {
    return css`
      background: ${t.modalBackBg};
      opacity: ${t.modalBackOpacity};
    `;
  },

  window(t: ITheme) {
    return css`
      background: ${t.bgDefault};
    `;
  },
  centerContainer(t: ITheme) {
    return css`
      margin: 40px 20px;

      @media screen and (max-width: ${t.modalAdaptiveThreshold}) {
        margin: 0;
        width: 100%;
      }
    `;
  },

  close(t: ITheme) {
    return css`
      ${resetButton()};

      background: none;
      margin: 2px 2px 0 0;
      width: 76px;
      height: 65px;

      &.${styles.disabled} {
        color: ${t.modalCloseButtonDisabledColor};
      }

      &:after,
      &:before {
        background: ${t.modalCloseButtonColor};
      }

      &:focus::before,
      &:focus::after,
      &:hover::before,
      &:hover::after {
        background: ${t.modalCloseButtonHoverColor};
      }

      &:focus {
        &.${styles.closeOutline} {
          border: 2px solid ${t.borderColorFocus};
        }
      }
    `;
  },

  footer(t: ITheme) {
    return css`
      &.${styles.panel} {
        background: ${t.modalFooterBg};
      }
    `;
  },

  fixedHeader(t: ITheme) {
    return css`
      background: ${t.modalFixedHeaderBg};

      &:after {
        box-shadow: ${t.modalFixedHeaderShadow};
      }
    `;
  },

  fixedFooter(t: ITheme) {
    return css`
      background: ${t.modalFixedHeaderBg};

      &:before {
        box-shadow: ${t.modalFixedFooterShadow};
      }
    `;
  },
};
