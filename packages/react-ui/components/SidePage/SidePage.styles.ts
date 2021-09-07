import { is8pxTheme } from '../../lib/theming/ThemeHelpers';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
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
      padding-top: ${is8pxTheme(t) ? t.sidePagePaddingTop : 0};
    `;
  },

  containerWithoutFooter(t: Theme) {
    return css`
      padding-bottom: ${is8pxTheme(t) ? t.sidePagePaddingBottom : 0};
    `;
  },

  containerWithPanel(t: Theme) {
    return css`
      padding-bottom: ${is8pxTheme(t) ? t.sidePagePaddingBottom : 0};
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

  wrapperLeft() {
    return css`
      float: left;
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
      box-shadow: ${t.sidePageContainerShadow};
    `;
  },

  leftSide() {
    return css`
      left: 0;
      right: auto;
    `;
  },

  close(t: Theme) {
    return css`
      ${resetButton()};
      cursor: pointer;
      color: ${t.sidePageCloseButtonColor};
      padding: ${t.sidePageCloseButtonClickAreaX};
      margin: -${t.sidePageCloseButtonClickAreaX} 0 0;
      font-size: 0;

      &:focus,
      &:hover {
        color: ${t.sidePageCloseButtonHoverColor};
      }

      &:focus-visible {
        outline: 2px solid ${t.borderColorFocus};
      }

      & > svg {
        width: ${t.sidePageCloseIconSize};
        height: ${t.sidePageCloseIconSize};
        box-sizing: content-box;
      }
    `;
  },

  wrapperClose(t: Theme) {
    const paddingRight = parseInt(t.sidePageCloseButtonPadding) - parseInt(t.sidePageCloseButtonClickAreaX);
    return css`
      box-sizing: border-box;
      direction: rtl;
      height: 100%;
      line-height: ${t.sidePageHeaderLineHeight};
      padding: ${t.sidePageHeaderPaddingTop} 0 ${t.sidePageHeaderPaddingBottom};
      position: absolute;
      right: ${paddingRight}px;
      top: 0;
      width: 1px;
    `;
  },

  panel(t: Theme) {
    return css`
      background: ${t.sidePageFooterPanelBg};
      padding: ${t.sidePageFooterPanelPaddingTop} ${t.sidePagePaddingRight} ${t.sidePageFooterPanelPaddingBottom}
        ${t.sidePagePaddingLeft};
    `;
  },

  fixed(t: Theme) {
    return css`
      line-height: ${t.sidePageHeaderFixedLineHeight};
      padding: ${t.sidePageHeaderFixedPaddingY} 0;
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
      transform: translate(0, 0);
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
});
