import { css, cssName } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      cursor: pointer;
      position: relative;
      white-space: nowrap;
    `;
  },

  after(t: Theme) {
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

      ${cssName(jsStyles.root(t))}:hover & {
        background: ${t.radioHoverBg};
        box-shadow: ${t.radioHoverShadow};
      }
      ${cssName(jsStyles.root(t))}:active & {
        background: ${t.radioActiveBg};
        box-shadow: ${t.radioActiveShadow};
      }
      ${cssName(jsStyles.input(t))}:focus + &::after {
        ${jsStyles.after(t)};
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
        ${jsStyles.after(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &::after {
        ${jsStyles.after(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.borderColorWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &::after {
        ${jsStyles.after(t)};
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

      ${cssName(jsStyles.disabled(t))}&::before {
        background: #808080 !important;
      }
    `;
  },

  input(t: Theme) {
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
      background: #f2f2f2 !important;
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

  labelDisabled(t: Theme) {
    return css`
      color: #a0a0a0;
    `;
  },

  placeholder(t: Theme) {
    return css`
      display: inline-block;
    `;
  },
};
