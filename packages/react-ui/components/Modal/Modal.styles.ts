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

  centerContainer(t: Theme) {
    return css`
      position: relative;
      display: inline-block;
      text-align: left;
      vertical-align: middle;
      box-sizing: border-box;
      z-index: 10;
      margin: 40px 20px;

      @media screen and (max-width: ${t.modalAdaptiveThreshold}) {
        margin: 0;
        width: 100%;
      }
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

      &:focus,
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

  disabled(t: Theme) {
    return css`
      pointer-events: none;
      cursor: default;
      color: ${t.modalCloseButtonDisabledColor};
    `;
  },

  focus(t: Theme) {
    return css`
      outline: 2px solid ${t.borderColorFocus};
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

  body(t: Theme) {
    return css`
      padding: 0 ${t.modalPaddingRight} ${t.modalBodyPaddingBottom} ${t.modalPaddingLeft};
    `;
  },

  headerWithClose(t: Theme) {
    const rightPadding =
      2 * parseInt(t.modalCloseButtonPadding) + parseInt(t.modalCloseIconSize) + parseInt(t.modalCloseLegacyGap);

    return css`
      padding-right: ${rightPadding}px;
    `;
  },

  footer(t: Theme) {
    return css`
      padding: ${t.modalFooterPaddingTop} ${t.modalPaddingRight} ${t.modalFooterPaddingBottom} ${t.modalPaddingLeft};
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
});
