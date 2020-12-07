import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

const styles = {
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

  alignTop(t: Theme) {
    return css`
      ${cssName(styles.centerContainer(t))}& {
        vertical-align: top;
      }
    `;
  },

  close(t: Theme) {
    const iconSize = 14;
    const margin = 0;
    const paddingTop = 35;
    const paddingBottom = 20;
    const blockSize = iconSize + paddingTop + paddingBottom;
    return css`
      ${resetButton()};
      position: absolute;
      right: ${margin}px;
      top: ${margin}px;
      width: ${blockSize}px;
      height: ${blockSize}px;
      background: none;
      background: transparent;
      cursor: pointer;
      color: ${t.modalCloseButtonColor};
      text-align: center;
      vertical-align: middle;

      &:focus,
      &:hover {
        color: ${t.modalCloseButtonHoverColor};
      }

      & > svg {
        width: ${iconSize}px;
        height: ${iconSize}px;
        padding: ${paddingTop}px ${paddingTop}px ${paddingBottom}px ${paddingBottom}px;
        box-sizing: content-box;
      }
    `;
  },

  closeWrapper() {
    return css`
      position: relative;
      float: right;
      width: 76px;
      height: 76px;
    `;
  },

  disabled(t: Theme) {
    return css`
      ${cssName(styles.close(t))}& {
        pointer-events: none;
        cursor: default;
        color: ${t.modalCloseButtonDisabledColor};
      }
    `;
  },

  closeOutline(t: Theme) {
    return css`
      ${cssName(styles.close(t))} & {
        display: none;
      }

      ${cssName(styles.close(t))}:focus & {
        border: 2px solid ${t.borderColorFocus};
        position: absolute;
        display: block;
        top: 27px;
        right: 27px;
        width: 26px;
        height: 26px;
      }
    `;
  },

  header() {
    return css`
      font-size: 22px;
      line-height: 30px;
      padding: 24px 110px 11px 30px;
      overflow-wrap: break-word;
      word-wrap: break-word;
    `;
  },

  body() {
    return css`
      padding: 0 35px 25px 30px;
    `;
  },

  footer() {
    return css`
      padding: 0 35px 30px 30px;
    `;
  },

  panel(t: Theme) {
    return css`
      ${cssName(styles.footer())}& {
        padding-top: 20px;
        padding-bottom: 20px;
        background: ${t.modalFooterBg};
      }
    `;
  },

  fixedHeader(t: Theme) {
    return css`
      margin-bottom: 10px;
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

  bodyWithoutHeader() {
    return css`
      padding-top: 30px;
    `;
  },

  bodyWithoutPadding() {
    return css`
      padding: 0 !important;
    `;
  },

  bodyAddPadding() {
    return css`
      padding-bottom: 30px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
