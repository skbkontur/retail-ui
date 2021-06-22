import { is8pxTheme } from '../../lib/theming/ThemeHelpers';
import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root() {
    return css`
      height: 100%;
      position: fixed;
      right: 0;
      top: 0;
    `;
  },

  overlay() {
    return css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    `;
  },

  body() {
    return css`
      height: 100%;
      z-index: 0;
    `;
  },

  container(t: Theme) {
    return css`
      padding-left: ${t.sidePagePaddingLeft};
      padding-right: ${t.sidePagePaddingRight};
    `;
  },

  containerWithoutHeader(t: Theme) {
    return css`
      padding-top: ${is8pxTheme(t) ? t.sidePagePaddingTop : 0} !important;
    `;
  },

  containerWithoutFooter(t: Theme) {
    return css`
      padding-bottom: ${is8pxTheme(t) ? t.sidePagePaddingBottom : 0} !important;
    `;
  },

  containerWithPanel(t: Theme) {
    return css`
      padding-bottom: ${is8pxTheme(t) ? t.sidePagePaddingBottom : 0} !important;
    `;
  },

  wrapper(t: Theme) {
    return css`
      background: ${t.sidePageBgDefault};
      float: right;
      height: 100%;
      width: 100%;
      overflow-y: auto;
      position: relative;
      white-space: normal;
    `;
  },

  layout() {
    return css`
      align-items: stretch;
      display: flex;
      flex-direction: column;
    `;
  },

  header(t: Theme) {
    return css`
      font-size: ${t.sidePageHeaderFontSize};
      line-height: ${t.sidePageHeaderLineHeight};
      padding: ${t.sidePageHeaderPaddingTop} 0 ${t.sidePageHeaderPaddingBottom};
      width: 100%;
      position: relative;
    `;
  },

  headerFixed(t: Theme) {
    return css`
      background: ${t.sidePageBgDefault};
      font-size: ${t.sidePageHeaderFixedFontSize};
      line-height: ${t.sidePageHeaderFixedLineHeight};
      padding: ${t.sidePageHeaderFixedPaddingY} 0;

      &:after {
        bottom: 0px;
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        z-index: -1;
        box-shadow: ${t.sidePageFixedHeaderShadow};
      }
    `;
  },

  title(t: Theme) {
    const paddingRight =
      parseInt(t.sidePageCloseButtonPadding) +
      parseInt(t.sidePageCloseButtonLegacyPaddingLeft) +
      parseInt(t.sidePageCloseIconSize);
    return css`
      padding-left: ${t.sidePagePaddingLeft};
      padding-right: ${paddingRight}px;
    `;
  },

  titleFixed() {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  },

  background() {
    return css`
      height: 100%;
      position: absolute;
      width: 100%;
    `;
  },

  backgroundGray(t: Theme) {
    return css`
      background: ${t.sidePageBackingBg};
      opacity: ${t.sidePageBackingBgOpacity};
    `;
  },

  shadow(t: Theme) {
    return css`
      ${cssName(styles.wrapper(t))}& {
        box-shadow: ${t.sidePageContainerShadow};
      }
    `;
  },

  leftSide(t: Theme) {
    return css`
      left: 0;
      right: auto;

      & ${cssName(styles.wrapper(t))} {
        float: left;
      }
    `;
  },

  close(t: Theme) {
    return css`
      color: ${t.sidePageCloseButtonColor};
      cursor: pointer;
      position: absolute;
      right: ${t.sidePageCloseButtonPadding};
      text-align: center;
      text-decoration: none;
      width: ${t.sidePageCloseIconSize};
      padding: 0 ${t.sidePageCloseButtonClickAreaX};
      margin: 0 -${t.sidePageCloseButtonClickAreaX};

      &:hover {
        color: ${t.sidePageCloseButtonHoverColor};
      }
    `;
  },

  panel(t: Theme) {
    return css`
      background: ${t.sidePageFooterPanelBg} !important;
      padding: ${t.sidePageFooterPanelPaddingTop} ${t.sidePagePaddingRight} ${t.sidePageFooterPanelPaddingBottom}
        ${t.sidePagePaddingLeft};
    `;
  },

  closeIcon(t: Theme) {
    return css`
      display: inline-block;
      height: ${t.sidePageCloseIconSize};
      width: ${t.sidePageCloseIconSize};
      line-height: 0;
    `;
  },

  fixed(t: Theme) {
    return css`
      line-height: ${t.sidePageHeaderFixedLineHeight};
    `;
  },

  footer() {
    return css`
      bottom: 0;
      position: fixed;
      z-index: 10;
    `;
  },

  footerContent(t: Theme) {
    return css`
      padding: ${t.sidePageFooterPaddingTop} ${t.sidePagePaddingRight} ${t.sidePageFooterPaddingBottom}
        ${t.sidePagePaddingLeft};
    `;
  },

  footerFixed(t: Theme) {
    return css`
      background: ${t.sidePageBgDefault};

      &:before {
        top: 0px;
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        z-index: -1;
        box-shadow: ${t.sidePageFixedFooterShadow};
      }
    `;
  },

  transitionLeft() {
    return css`
      transform: translateX(100px);
    `;
  },

  transitionRight() {
    return css`
      transform: translateX(-100px);
    `;
  },

  transitionActive() {
    return css`
      transition: transform 0.18s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.18s cubic-bezier(0.22, 0.61, 0.36, 1);
      opacity: 1;
      transform: translate(0, 0) !important;
    `;
  },

  transitionLeave() {
    return css`
      opacity: 1;
    `;
  },

  transitionLeaveActive() {
    return css`
      opacity: 0.01;
      transition: opacity 0.15s ease-out;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
