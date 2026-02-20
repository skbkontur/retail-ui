import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const modalGlobalClasses = prefix('modal')({
  root: 'root',
  container: 'container',
});

export const styles = memoizeStyle({
  root() {
    return css`
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
    `;
  },

  bg(t: Theme) {
    return css`
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      background: ${t.modalBackBg};
      opacity: ${t.modalBackOpacity};
    `;
  },

  container() {
    return css`
      position: relative;
      white-space: nowrap;
      text-align: center;
      height: 100%;
      overflow-y: auto;
      outline: none;
    `;
  },

  containerDesktop() {
    return css`
      &::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 80%; /* to vertical align modal 40%/60% of screen height */
      }
    `;
  },

  container5_2() {
    return css`
      min-height: 64px;
    `;
  },

  containerMobile(t: Theme) {
    return css`
      height: ${t.mobileModalContainerHeight};
      margin-top: ${t.mobileModalContainerMarginTop};
      margin-right: ${t.mobileModalContainerMarginRight};
      margin-bottom: ${t.mobileModalContainerMarginBottom};
      margin-left: ${t.mobileModalContainerMarginLeft};
    `;
  },

  mobileContainerFullscreen5_2() {
    return css`
      margin: 0;
    `;
  },

  mobileContainerSmall5_2() {
    return css`
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
    `;
  },
  mobileContainerSmallTop5_2() {
    return css`
      align-content: start;
    `;
  },
  mobileContainerSmallBottom5_2() {
    return css`
      align-content: end;
    `;
  },

  window(t: Theme) {
    return css`
      position: relative;
      white-space: normal;
      margin: auto;
      box-shadow: ${t.modalWindowShadow};
      background: ${t.modalBg};
      border-radius: ${t.modalBorderRadius};
    `;
  },

  mobileWindow() {
    return css`
      width: 100%;
      height: 100%;
      overflow: hidden;
    `;
  },

  mobileWindowFullscreen5_2() {
    return css`
      border-radius: 0;
    `;
  },

  centerContainer() {
    return css`
      position: relative;
      display: inline-block;
      text-align: left;
      vertical-align: middle;
      box-sizing: border-box;
      z-index: 10;
      margin: 40px 20px;
    `;
  },

  mobileCenterContainer() {
    return css`
      margin: 0;
      width: 100%;
      height: 100%;
    `;
  },

  mobileCenterContainer5_2(t: Theme) {
    return css`
      padding: 0;
      width: calc(100% - ${t.mobileModalContainerMarginLeft} - ${t.mobileModalContainerMarginRight});
      display: inline-flex;
      margin: ${t.mobileModalContainerMarginTop} ${t.mobileModalContainerMarginRight}
        ${t.mobileModalContainerMarginBottom} ${t.mobileModalContainerMarginLeft};
      max-height: calc(100% - ${t.mobileModalContainerMarginTop} - ${t.mobileModalContainerMarginBottom});
    `;
  },

  mobileCenterContainerBig5_2(t: Theme) {
    return css`
      height: calc(100% - ${t.mobileModalContainerMarginTop} - ${t.mobileModalContainerMarginBottom});
    `;
  },

  mobileCenterContainerFullscreen5_2() {
    return css`
      margin: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
    `;
  },

  alignTop() {
    return css`
      vertical-align: top;
    `;
  },

  close(t: Theme) {
    const padding = parseInt(t.modalCloseButtonPadding);
    return css`
      ${resetButton()};
      position: absolute;
      display: flex;
      right: ${padding}px;
      top: ${padding}px;
      background: transparent;
      cursor: pointer;
      color: ${t.modalCloseButtonColor};
      text-align: center;
      vertical-align: middle;
      padding: ${t.modalCloseButtonClickArea};
      margin: -${t.modalCloseButtonClickArea};

      &:hover {
        color: ${t.modalCloseButtonHoverColor};
      }

      & > svg {
        width: ${t.modalCloseIconSize};
        height: ${t.modalCloseIconSize};
        box-sizing: content-box;
      }
    `;
  },

  close5_1(t: Theme) {
    return css`
      justify-content: center;
      align-items: center;
      right: ${t.modalCloseButtonClickAreaRight};
      top: ${t.modalCloseButtonClickAreaTop};

      padding-top: ${t.modalCloseButtonClickAreaTop};
      margin-top: -${t.modalCloseButtonClickAreaTop};
      padding-right: ${t.modalCloseButtonClickAreaRight};
      margin-right: -${t.modalCloseButtonClickAreaRight};
      padding-bottom: ${t.modalCloseButtonClickAreaBottom};
      margin-bottom: -${t.modalCloseButtonClickAreaBottom};
      padding-left: ${t.modalCloseButtonClickAreaLeft};
      margin-left: -${t.modalCloseButtonClickAreaLeft};
    `;
  },

  closeMobile(t: Theme) {
    return css`
      right: ${t.mobileModalCloseButtonRightPadding};
      top: ${parseInt(t.mobileModalCloseButtonTopPadding) + parseInt(t.mobileModalHeaderPadding)}px;
      padding: ${t.mobileModalCloseButtonClickArea};
      margin: -${t.mobileModalCloseButtonClickArea};

      & > svg {
        width: ${t.mobileModalCloseIconSize};
        height: ${t.mobileModalCloseIconSize};
      }
    `;
  },

  closeMobile5_1(t: Theme) {
    return css`
      top: ${t.mobileModalCloseButtonTopPadding};
    `;
  },

  mobileCloseWithoutHeader() {
    return css`
      position: static;
    `;
  },

  mobileCloseWithoutHeader5_2(t: Theme) {
    return css`
      position: absolute;
      padding: ${t.mobileModalWithoutHeaderCloseButtonPadding};
      margin: -${t.mobileModalWithoutHeaderCloseButtonPadding};
      top: ${t.mobileModalWithoutHeaderCloseButtonPadding};
      right: ${t.mobileModalWithoutHeaderCloseButtonPadding};
    `;
  },

  closeWrapper(t: Theme) {
    const padding = parseInt(t.modalCloseButtonPadding);
    const paddingBottom = parseInt(t.modalCloseButtonBottomPadding);

    const blockSizeX = parseInt(t.modalCloseIconSize) + 2 * padding;
    const blockSizeY = parseInt(t.modalCloseIconSize) + padding + paddingBottom;
    return css`
      position: relative;
      float: right;
      width: ${blockSizeX}px;
      height: ${blockSizeY}px;
    `;
  },

  mobileCloseWrapper(t: Theme) {
    const size = parseInt(t.mobileModalCloseIconSize) + parseInt(t.mobileModalCloseButtonClickArea) * 2;

    return css`
      position: absolute;
      right: ${t.mobileModalCloseButtonRightPadding};
      top: ${t.mobileModalCloseButtonTopPadding};
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(50% 50% at 50% 50%, ${t.bgDefault} 60%, rgba(255, 255, 255, 0) 100%);
      border-radius: ${size}px;
    `;
  },

  mobileCloseWrapper5_2(t: Theme) {
    return css`
      position: sticky;
      right: 0;
      top: 0;
      margin-left: auto;
      width: ${t.mobileModalWithoutHeaderCloseButtonWidth};
      height: 0;
    `;
  },

  disabled(t: Theme) {
    return css`
      pointer-events: none;
      cursor: default;
      color: ${t.modalCloseButtonDisabledColor};
    `;
  },

  focus(t: Theme) {
    return css`
      color: ${t.modalCloseButtonHoverColor};
      outline: 2px solid ${t.borderColorFocus};
    `;
  },

  focus5_1(t: Theme) {
    return css`
      &:before {
        content: '';
        position: absolute;
        width: calc(${t.modalCloseIconSize} * 2);
        height: calc(${t.modalCloseIconSize} * 2);
        box-shadow: inset 0 0 0 2px ${t.borderColorFocus};
        border-radius: 4px;
      }
    `;
  },

  header(t: Theme) {
    return css`
      font-size: ${t.modalHeaderFontSize};
      line-height: ${t.modalHeaderLineHeight};
      padding: ${t.modalHeaderPaddingTop} ${t.modalPaddingRight} ${t.modalHeaderPaddingBottom} ${t.modalPaddingLeft};
      overflow-wrap: break-word;
      word-wrap: break-word;
      color: ${t.modalHeaderTextColor};
      font-weight: ${t.modalHeaderFontWeight};
    `;
  },

  header5_2(t: Theme) {
    return css`
      border-radius: ${t.modalBorderRadius} ${t.modalBorderRadius} 0 0;
    `;
  },

  mobileHeader(t: Theme) {
    return css`
      position: relative;
      font-size: ${t.mobileModalHeaderFontSize};
      line-height: ${t.mobileModalHeaderLineHeight};
      padding: ${t.mobileModalHeaderPadding};
    `;
  },

  titleCut() {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  },

  body(t: Theme) {
    return css`
      border-radius: ${t.modalBodyBorderRadius};
      padding-top: ${t.modalBodyPaddingTop};
      padding-right: ${t.modalPaddingRight};
      padding-bottom: ${t.modalBodyPaddingBottom};
      padding-left: ${t.modalPaddingLeft};
      color: ${t.modalBodyTextColor};
    `;
  },

  mobileBody(t: Theme) {
    return css`
      padding: ${t.mobileModalBodyPadding};
      display: flex;
      flex-flow: column;
      flex: 1;
      font-size: ${t.mobileModalBodyFontSize};
    `;
  },

  headerWithClose(t: Theme) {
    const rightPadding = 2 * parseInt(t.modalCloseButtonPadding) + parseInt(t.modalCloseIconSize);

    return css`
      padding-right: ${rightPadding}px;
    `;
  },

  mobileHeaderWithClose(t: Theme) {
    return css`
      padding-right: ${2 * parseInt(t.mobileModalCloseButtonRightPadding) + parseInt(t.mobileModalCloseIconSize)}px;
    `;
  },

  footer(t: Theme) {
    return css`
      padding: ${t.modalFooterPaddingTop} ${t.modalPaddingRight} ${t.modalFooterPaddingBottom} ${t.modalPaddingLeft};
      color: ${t.modalFooterTextColor};
      border-radius: 0 0 ${t.modalBorderRadius} ${t.modalBorderRadius};
    `;
  },

  mobileFooter(t: Theme) {
    return css`
      padding: ${t.mobileModalFooterPadding};
    `;
  },

  panel(t: Theme) {
    return css`
      padding-top: ${t.modalFooterPanelPaddingTop};
      padding-bottom: ${t.modalFooterPanelPaddingBottom};
      background: ${t.modalFooterBg};
    `;
  },

  fixedHeader(t: Theme) {
    return css`
      margin-bottom: ${t.modalFixedHeaderMarginBottom};
      padding-bottom: ${t.modalFixedHeaderPaddingBottom};
      background: ${t.modalFixedHeaderBg};
      border-bottom: ${t.modalFixedHeaderBorder};

      &:after {
        bottom: 11px;
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        z-index: -1;
        box-shadow: ${t.modalFixedHeaderShadow};
      }
    `;
  },

  fixedHeader5_2() {
    return css`
      border-radius: 0;
    `;
  },

  mobileFixedHeader(t: Theme) {
    return css`
      padding-bottom: ${t.mobileModalHeaderPadding};
    `;
  },

  mobileFixedHeader5_2(t: Theme) {
    return css`
      border-radius: ${t.modalBorderRadius} ${t.modalBorderRadius} 0 0;
    `;
  },

  fixedFooter(t: Theme) {
    return css`
      padding-top: ${t.modalFixedFooterPaddingTop};
      margin-top: ${t.modalFixedFooterMarginTop};
      background: ${t.modalFixedHeaderBg};
      border-top: ${t.modalFixedFooterBorder};

      &:before {
        top: 11px;
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        z-index: -1;
        box-shadow: ${t.modalFixedFooterShadow};
      }
    `;
  },

  fixedFooter5_2() {
    return css`
      border-radius: 0;
    `;
  },

  mobileFixedFooter5_2(t: Theme) {
    return css`
      border-radius: 0 0 ${t.modalBorderRadius} ${t.modalBorderRadius};
    `;
  },

  fixedPanel(t: Theme) {
    return css`
      &:before {
        box-shadow: ${t.modalFixedPanelShadow};
      }
    `;
  },

  headerAddPadding(t: Theme) {
    return css`
      padding-bottom: ${t.modalHeaderAdditionalPaddingBottom};
    `;
  },

  bodyWithoutHeader(t: Theme) {
    return css`
      padding-top: ${t.modalPaddingTop};
    `;
  },

  mobileBodyWithoutHeader() {
    return css`
      padding-top: 0;
    `;
  },

  mobileBodyWithoutHeader5_2(t: Theme) {
    return css`
      padding-top: ${t.mobileModalBodyPaddingTop};
      padding-right: ${t.mobileModalWithoutHeaderCloseButtonWidth};
    `;
  },

  bodyWithoutPadding() {
    return css`
      padding: 0;
    `;
  },

  bodyAddPaddingForPanel(t: Theme) {
    return css`
      padding-bottom: ${t.modalPaddingBottom};
    `;
  },

  mobileBodyAddPaddingForPanel(t: Theme) {
    return css`
      padding: ${t.mobileModalBodyPadding};
    `;
  },

  mobileBodyAddPaddingForPanel5_2(t: Theme) {
    return css`
      padding-bottom: ${t.mobileModalBodyPaddingBottom};
    `;
  },

  columnFlexContainer() {
    return css`
      height: 100%;
      display: flex;
      flex-flow: column;
      overflow-y: auto;
    `;
  },

  modalSeparatorWrapper() {
    return css`
      position: absolute;
      width: 100%;
    `;
  },

  modalSeparator(t: Theme) {
    return css`
      border-bottom: ${t.modalSeparatorBorderBottom};
      margin: ${t.modalSeparatorMargin};
      transition: margin 0.3s;
    `;
  },

  modalSeparatorFixed(t: Theme) {
    return css`
      margin: ${t.modalSeparatorFixedMargin};
    `;
  },
});
