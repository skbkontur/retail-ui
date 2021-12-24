import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
  root() {
    return css`
      height: 100%;
      position: fixed;
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
      flex: 1 0 auto;
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
      padding-top: ${t.sidePagePaddingTop};
    `;
  },

  containerWithoutFooter(t: Theme) {
    return css`
      padding-bottom: ${t.sidePagePaddingBottom};
    `;
  },

  containerWithPanel(t: Theme) {
    return css`
      padding-bottom: ${t.sidePagePaddingBottom};
    `;
  },

  focusLock() {
    return css`
      height: 100%;
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
      align-items: stretch;
      display: flex;
      flex-direction: column;
    `;
  },

  wrapperLeft() {
    return css`
      float: left;
    `;
  },

  wrapperMarginLeft() {
    return css`
      margin-left: 20px;
    `;
  },

  wrapperMarginRight() {
    return css`
      margin-right: 20px;
    `;
  },

  headerWrapper() {
    return css`
      flex: 0 0 auto;
    `;
  },

  header(t: Theme) {
    return css`
      font-size: ${t.sidePageHeaderFontSize};
      line-height: ${t.sidePageHeaderLineHeight};
      padding: ${t.sidePageHeaderPaddingTop} 0 ${t.sidePageHeaderPaddingBottom};
      width: 100%;
      position: relative;
      color: ${t.sidePageHeaderTextColor};
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

  close(t: Theme) {
    return css`
      ${resetButton()};
      cursor: pointer;
      color: ${t.sidePageCloseButtonColor};
      padding: ${t.sidePageCloseButtonClickArea};
      margin: -${t.sidePageCloseButtonClickArea};
      font-size: 0;

      &:focus,
      &:hover {
        color: ${t.sidePageCloseButtonHoverColor};
      }

      & > svg {
        width: ${t.sidePageCloseIconSize};
        height: ${t.sidePageCloseIconSize};
        box-sizing: content-box;
      }
    `;
  },

  closeFocus(t: Theme) {
    return css`
      outline: 2px solid ${t.borderColorFocus};
    `;
  },

  wrapperClose(t: Theme) {
    return css`
      box-sizing: border-box;
      height: 100%;
      line-height: ${t.sidePageHeaderLineHeight};
      padding: ${t.sidePageHeaderPaddingTop} 0 ${t.sidePageHeaderPaddingBottom};
      position: absolute;
      right: ${t.sidePageCloseButtonPadding};
      top: 0;
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

  footerWrapper() {
    return css`
      flex: 0 0 auto;
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
