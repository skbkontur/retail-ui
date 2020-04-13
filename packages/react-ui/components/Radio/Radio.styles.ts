import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root() {
    return css`
      cursor: pointer;
      position: relative;
      white-space: nowrap;
    `;
  },

  after() {
    return css`
      content: ' ';
      position: absolute;
      left: -2px;
      top: -2px;
      width: 20px;
      height: 20px;
      border-width: 2px;
      border-style: solid;
      border-radius: 50%;
      box-sizing: border-box;
    `;
  },

  radio(t: Theme) {
    return css`
      background-image: ${t.radioBgImage};
      border-radius: 50%;
      border: ${t.radioBorder};
      box-shadow: ${t.radioBoxShadow};
      box-sizing: border-box;
      display: inline-block;
      height: ${t.radioSize};
      margin-bottom: 2px;
      margin-top: 2px;
      position: relative;
      vertical-align: ${t.radioVerticalAlign};
      width: ${t.radioSize};

      ${cssName(styles.root())}:hover &:not(${cssName(styles.disabled(t))}) {
        background: ${t.radioHoverBg};
        box-shadow: ${t.radioHoverShadow};
      }
      ${cssName(styles.root())}:hover &${cssName(styles.checked(t))}:not(${cssName(styles.disabled(t))}) {
        background: ${t.radioCheckedHoverBgColor};
      }
      ${cssName(styles.root())}:active & {
        background: ${t.radioActiveBg};
        box-shadow: ${t.radioActiveShadow};
      }
      ${cssName(styles.input())}:focus + &::after {
        ${styles.after()};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorFocus};
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
        ${styles.after()};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &::after {
        ${styles.after()};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &::after {
        ${styles.after()};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorError};
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
        height: 8px;
        width: 8px;
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
      line-height: 20px;
      margin-left: 9px;
      white-space: normal;
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
