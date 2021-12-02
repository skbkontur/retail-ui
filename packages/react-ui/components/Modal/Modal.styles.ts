import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

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

      &::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        height: 80%; /* to vertical align modal 40%/60% of screen height */
      }
    `;
  },

  window(t: Theme) {
    return css`
      position: relative;
      white-space: normal;
      margin: auto;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      background: ${t.bgDefault};
    `;
  },

  mobileWindow() {
    return css`
      width: 100% !important;
      height: 100%;
      overflow: auto;
    `;
  },

  centerContainer(t: Theme) {
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
      width: 100% !important;
      height: 100%;
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
      background: none;
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

  mobileClose(t: Theme) {
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

  closeWrapper(t: Theme) {
    const padding = parseInt(t.modalCloseButtonPadding);
    const paddingBottom = parseInt(t.modalCloseButtonBottomPadding);
    const legacyGap = parseInt(t.modalCloseWrapperLegacyGap);
    const legacyShift = parseInt(t.modalCloseButtonLegacyShift);
    const blockSizeX = parseInt(t.modalCloseIconSize) + 2 * padding - legacyShift;
    const blockSizeY = parseInt(t.modalCloseIconSize) + padding + paddingBottom + legacyGap;
    return css`
      position: relative;
      float: right;
      width: ${blockSizeX + legacyGap}px;
      height: ${blockSizeY}px;
    `;
  },

  mobileCloseWrapper(t: Theme) {
    return css`
      width: ${parseInt(t.mobileModalCloseIconSize) + 2 * parseInt(t.mobileModalCloseButtonRightPadding)}px;
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

  mobileCloseWithoutHeaderWrapper(t: Theme) {
    return css`
      float: right;
      padding-top: ${parseInt(t.mobileModalCloseButtonClickArea) / 2}px;
      width: ${parseInt(t.mobileModalCloseIconSize) + parseInt(t.mobileModalCloseButtonClickArea)}px;
      height: ${parseInt(t.mobileModalCloseIconSize) + parseInt(t.mobileModalCloseButtonClickArea)}px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    `;
  },

  noAbsolute() {
    return css`
      position: static;
    `;
  },

  headerWrapper() {
    return css`
      position: relative;
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
    `;
  },

  mobileHeader(t: Theme) {
    return css`
      font-size: ${t.mobileModalHeaderFontSize};
      line-height: ${t.mobileModalHeaderLineHeight};
      padding: ${t.mobileModalHeaderPadding};
    `;
  },

  body(t: Theme) {
    return css`
      padding: 0 ${t.modalPaddingRight} ${t.modalBodyPaddingBottom} ${t.modalPaddingLeft};
    `;
  },

  mobileBody(t: Theme) {
    return css`
      padding: ${t.mobileModalBodyPadding};
      padding-top: 0px;
      display: flex;
      flex-flow: column;
      flex: 1;
      font-size: ${t.mobileModalBodyFontSize};
    `;
  },

  headerWithClose(t: Theme) {
    const rightPadding =
      2 * parseInt(t.modalCloseButtonPadding) + parseInt(t.modalCloseIconSize) + parseInt(t.modalCloseLegacyGap);

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
    `;
  },

  mobileFooter(t: Theme) {
    return css`
      padding: ${t.mobileModalFooterPadding} !important;
    `;
  },

  footerWrapper() {
    return css`
      position: relative;
    `;
  },

  panel(t: Theme) {
    return css`
      padding-top: ${t.modalFooterPanelPaddingTop};
      padding-bottom: ${t.modalFooterPanelPaddingBottom};
      background: ${t.modalFooterBg};
    `;
  },

  mobilePanel(t: Theme) {
    return css`
      padding: ${t.mobileModalFooterPanelPadding};
    `;
  },

  fixedHeader(t: Theme) {
    return css`
      margin-bottom: 10px;
      padding-bottom: ${t.modalFixedHeaderPaddingBottom};
      background: ${t.modalFixedHeaderBg};

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

  mobileFixedHeader(t: Theme) {
    return css`
      padding-bottom: ${t.mobileModalHeaderPadding};
    `;
  },

  fixedFooter(t: Theme) {
    return css`
      padding-top: 20px;
      margin-top: 10px;
      background: ${t.modalFixedHeaderBg};

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

  headerAddPadding() {
    return css`
      padding-bottom: 22px;
    `;
  },

  bodyWithoutHeader(t: Theme) {
    return css`
      padding-top: ${t.modalPaddingTop};
    `;
  },

  mobileBodyWithoutHeader(t: Theme) {
    return css`
      padding-top: ${t.mobileModalBodyPadding};
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
      padding-bottom: ${t.mobileModalBodyPadding};
    `;
  },

  columnFlexContainer() {
    return css`
      height: 100%;
      display: flex;
      flex-flow: column;
    `;
  },
});
