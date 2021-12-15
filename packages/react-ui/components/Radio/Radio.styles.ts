import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { isChrome } from '../../lib/client';

export const globalClasses = prefix('radio')({
  circle: 'circle',
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
      display: inline-flex;
      align-items: baseline;
      line-height: ${t.radioLineHeight};
      font-size: ${t.radioFontSize};

      &:hover .${globalClasses.circle} {
        background: ${t.radioHoverBg};
        box-shadow: ${t.radioHoverShadow};
      }
      &:active .${globalClasses.circle} {
        background: ${t.radioActiveBg};
        box-shadow: ${t.radioActiveShadow};
      }

      &::before {
        // non-breaking space.
        // makes a correct space for absolutely positioned circle,
        // and also height and baseline for radio without caption.
        content: '\\00A0';
        display: inline-block;
        width: ${t.radioSize};
        flex: 0 0 auto;
      }
    `;
  },

  rootIE11() {
    return css`
      display: inline-table;
    `;
  },

  rootChecked(t: Theme) {
    return css`
      &:hover .${globalClasses.circle} {
        background: ${t.radioCheckedHoverBgColor};
      }
    `;
  },

  circle(t: Theme) {
    const labGrotesqueCompenstation = parseInt(t.labGrotesqueBaselineCompensation);
    const fontSize = parseInt(t.checkboxFontSize);
    const baselineCompensation =
      fontSize < 16 && !isChrome
        ? labGrotesqueCompenstation
        : fontSize === 16 && isChrome
        ? -labGrotesqueCompenstation
        : 0;
    const circleSize = `calc(${t.radioSize} - 2 * ${t.radioBorderWidthCompensation})`;
    const circleOffsetY = `calc(${t.radioCircleOffsetY} + ${t.radioBorderWidthCompensation} + ${baselineCompensation}px)`;
    const circleMarginX = t.radioBorderWidthCompensation;
    return css`
      background-image: ${t.radioBgImage};
      border-radius: 50%;
      border: ${t.radioBorder};
      box-shadow: ${t.radioBoxShadow};
      box-sizing: border-box;
      display: inline-block;
      height: ${circleSize};
      width: ${circleSize};
      position: absolute;
      left: 0;
      margin: ${circleOffsetY} ${circleMarginX} 0;
      background-color: ${t.radioBgColor};
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
      background: ${t.radioDisabledBg} !important; // override root hover/active styles
      border-color: transparent !important; // override root hover/active styles
      box-shadow: ${t.radioDisabledShadow} !important; // override root hover/active styles
    `;
  },

  label(t: Theme) {
    return css`
      display: ${t.radioLabelDisplay};
      padding-left: ${t.radioLabelGap};
      white-space: normal;
      color: ${t.radioTextColor};
    `;
  },

  labelIE11() {
    return css`
      display: table-cell;
    `;
  },

  labelDisabled(t: Theme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },

  placeholder() {
    return css`
      display: inline-block;
    `;
  },
});
