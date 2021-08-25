import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('radio')({
  radio: 'radio',
});

const mixins = {
  afterOutline(t: Theme) {
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
};

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      padding-top: ${t.radioPaddingY};
      padding-bottom: ${t.radioPaddingY};
      display: inline-block;

      &:hover .${globalClasses.radio} {
        background: ${t.radioHoverBg};
        box-shadow: ${t.radioHoverShadow};
      }
      &:active .${globalClasses.radio} {
        background: ${t.radioActiveBg};
        box-shadow: ${t.radioActiveShadow};
      }
    `;
  },

  rootChecked(t: Theme) {
    return css`
      &:hover .${globalClasses.radio} {
        background: ${t.radioCheckedHoverBgColor};
      }
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
      background-color: ${t.radioBgColor};

      &::after {
        content: ' ';
        display: inline-block;
      }
    `;
  },

  focus(t: Theme) {
    return css`
      &::after {
        ${mixins.afterOutline(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.radioBorderColorFocus};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &::after {
        ${mixins.afterOutline(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.radioBorderColorWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &::after {
        ${mixins.afterOutline(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.radioBorderColorError};
      }
    `;
  },

  checked(t: Theme) {
    return css`
      position: relative;
      background-color: ${t.radioCheckedBgColor};
      border-color: ${t.radioCheckedBorderColor};

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
        background: ${t.radioCheckedBulletColor};
      }
    `;
  },

  checkedDisabled(t: Theme) {
    return css`
      &::before {
        background: ${t.gray};
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

      &:focus + .${globalClasses.radio}::after {
        ${mixins.afterOutline(t)};
        box-shadow: ${t.radioFocusShadow};
        border-color: ${t.radioBorderColorFocus};
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      background: ${t.radioDisabledBg} !important; // override root hover/active styles
      border-color: transparent !important; // override root hover/active styles
      box-shadow: ${t.radioDisabledShadow} !important; // override root hover/active styles
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
});
