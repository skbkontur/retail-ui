import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import {
  afterOutlineMixin,
  circleSizeMixin,
  outlineColorMixin,
  radioCheckedMixin,
  radioSizeMixin,
} from './Radio.mixins';

export const globalClasses = prefix('radio')({
  circle: 'circle',
});

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      display: inline-flex;
      align-items: baseline;

      .${globalClasses.circle} {
        transition: background ${t.transitionDuration} ${t.transitionTimingFunction};
      }

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
        flex: 0 0 auto;
      }
    `;
  },
  rootSmall(t: Theme) {
    return css`
      ${radioSizeMixin(t.radioFontSizeSmall, t.radioLineHeightSmall, t.radioPaddingYSmall, t.radioSizeSmall)};
    `;
  },
  rootMedium(t: Theme) {
    return css`
      ${radioSizeMixin(t.radioFontSizeMedium, t.radioLineHeightMedium, t.radioPaddingYMedium, t.radioSizeMedium)};
    `;
  },
  rootLarge(t: Theme) {
    return css`
      ${radioSizeMixin(t.radioFontSizeLarge, t.radioLineHeightLarge, t.radioPaddingYLarge, t.radioSizeLarge)};
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
    return css`
      background-image: ${t.radioBgImage};
      border-radius: 50%;
      border: ${t.radioBorder};
      box-shadow: ${t.radioBoxShadow};
      box-sizing: border-box;
      display: inline-block;
      position: absolute;
      left: 0;
      background-color: ${t.radioBgColor};
    `;
  },
  circleSmall(t: Theme) {
    return css`
      ${circleSizeMixin(
        t.labGrotesqueBaselineCompensation,
        t.radioFontSizeSmall,
        t.radioSizeSmall,
        t.radioBorderWidthCompensation,
        t.radioCircleOffsetY,
      )};
    `;
  },
  circleMedium(t: Theme) {
    return css`
      ${circleSizeMixin(
        t.labGrotesqueBaselineCompensation,
        t.radioFontSizeMedium,
        t.radioSizeMedium,
        t.radioBorderWidthCompensation,
        t.radioCircleOffsetY,
      )};
    `;
  },
  circleLarge(t: Theme) {
    return css`
      ${circleSizeMixin(
        t.labGrotesqueBaselineCompensation,
        t.radioFontSizeLarge,
        t.radioSizeLarge,
        t.radioBorderWidthCompensation,
        t.radioCircleOffsetY,
      )};
    `;
  },

  focus(t: Theme) {
    return css`
      &::after {
        ${afterOutlineMixin(t.radioOutlineWidth)};
        ${outlineColorMixin(t.radioFocusShadow, t.radioBorderColorFocus)};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &::after {
        ${afterOutlineMixin(t.radioOutlineWidth)};
        ${outlineColorMixin(t.radioFocusShadow, t.radioBorderColorWarning)};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &::after {
        ${afterOutlineMixin(t.radioOutlineWidth)};
        ${outlineColorMixin(t.radioFocusShadow, t.radioBorderColorError)};
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
        border-radius: 50%;
        background: ${t.radioCheckedBulletColor};
      }
    `;
  },
  checkedSmall(t: Theme) {
    return css`
      ${radioCheckedMixin(t.radioBulletSizeSmall)};
    `;
  },
  checkedMedium(t: Theme) {
    return css`
      ${radioCheckedMixin(t.radioBulletSizeMedium)};
    `;
  },
  checkedLarge(t: Theme) {
    return css`
      ${radioCheckedMixin(t.radioBulletSizeLarge)};
    `;
  },

  checkedDisabled(t: Theme) {
    return css`
      &::before {
        background: ${t.radioCheckedDisabledBulletBg};
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
    `;
  },

  disabled(t: Theme) {
    return css`
      background: ${t.radioDisabledBg} !important; // override root hover/active styles
      border-color: transparent !important; // override root hover/active styles
      box-shadow: ${t.radioDisabledShadow} !important; // override root hover/active styles
    `;
  },

  caption(t: Theme) {
    return css`
      display: ${t.radioCaptionDisplay};
      padding-left: ${t.radioCaptionGap};
      white-space: normal;
      color: ${t.radioTextColor};
    `;
  },

  captionIE11() {
    return css`
      display: table-cell;
    `;
  },

  captionDisabled(t: Theme) {
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
