import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      padding-top: ${t.radioPaddingY};
      padding-bottom: ${t.radioPaddingY};
      display: inline-block;
    `;
  },

  after(t: Theme) {
    return css`
      content: ' ';
      position: absolute;
      left: -${t.radioOutlineWidth};
      top: -${t.radioOutlineWidth};
      width: ${t.radioSizeAfter};
      height: ${t.radioSizeAfter};
      border-width: ${t.radioOutlineWidth};
      border-style: solid;
      border-radius: 50%;
      box-sizing: border-box;
    `;
  },

  radio(t: Theme) {
    const radioSize = `calc(${t.radioSize} - 2 * ${t.radioBorderWidthCompensation})`;
    const radioMarginY = `calc(${t.radioMarginY} + ${t.radioBorderWidthCompensation})`;
    const radioMarginX = t.radioBorderWidthCompensation;
    return css`
      background-image: ${t.radioBgImage};
      border-radius: 50%;
      border: ${t.radioBorder};
      box-shadow: ${t.radioBoxShadow};
      box-sizing: border-box;
      display: inline-block;
      height: ${radioSize};
      width: ${radioSize};
      position: relative;
      vertical-align: ${t.radioVerticalAlign};
      margin: ${radioMarginY} ${radioMarginX};

      ${cssName(styles.root(t))}:hover &:not(${cssName(styles.disabled(t))}) {
        background: ${t.radioHoverBg};
        box-shadow: ${t.radioHoverShadow};
      }
      ${cssName(styles.root(t))}:hover &${cssName(styles.checked(t))}:not(${cssName(styles.disabled(t))}) {
        background: ${t.radioCheckedHoverBgColor};
      }
      ${cssName(styles.root(t))}:active & {
        background: ${t.radioActiveBg};
        box-shadow: ${t.radioActiveShadow};
      }
      ${cssName(styles.input())}:focus + &::after {
        ${styles.after(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.radioBorderColorFocus};
      }
      &::after {
        content: ' ';
        display: inline-block;
      }
    `;
  },

  focus(t: Theme) {
    return css`
      &::after {
        ${styles.after(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.radioBorderColorFocus};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &::after {
        ${styles.after(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.radioBorderColorWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &::after {
        ${styles.after(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.radioBorderColorError};
      }
    `;
  },

  checked(t: Theme) {
    return css`
      position: relative;
      background-color: ${t.radioCheckedBgColor};

      &::before {
        content: ' ';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        height: ${t.radioBulletSize};
        width: ${t.radioBulletSize};
        border-radius: 50%;
        background: ${t.radioCheckedBulletColor} !important;
      }

      ${cssName(styles.disabled(t))}&::before {
        background: ${t.gray} !important;
      }
    `;
  },

  input() {
    return css`
      display: inline-block;
      height: 0;
      opacity: 0;
      position: absolute;
      width: 0;
      z-index: -1;
    `;
  },

  disabled(t: Theme) {
    return css`
      background: ${t.bgDisabled} !important;
      border-color: transparent !important;
      box-shadow: ${t.radioDisabledShadow} !important;
    `;
  },

  label(t: Theme) {
    return css`
      display: ${t.radioLabelDisplay};
      line-height: ${t.radioLineHeight};
      margin-left: ${t.radioLabelGap};
      white-space: normal;
      font-size: ${t.radioFontSize};
    `;
  },

  labelDisabled() {
    return css`
      color: #a0a0a0;
    `;
  },

  placeholder() {
    return css`
      display: inline-block;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
