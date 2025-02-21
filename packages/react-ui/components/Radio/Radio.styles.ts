import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
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

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        ${radioSizeMixin(emotion)(
          t.radioFontSizeSmall,
          t.radioLineHeightSmall,
          t.radioPaddingYSmall,
          t.radioSizeSmall,
        )};
      `;
    },
    rootMedium(t: Theme) {
      return emotion.css`
        ${radioSizeMixin(emotion)(
          t.radioFontSizeMedium,
          t.radioLineHeightMedium,
          t.radioPaddingYMedium,
          t.radioSizeMedium,
        )};
      `;
    },
    rootLarge(t: Theme) {
      return emotion.css`
        ${radioSizeMixin(emotion)(
          t.radioFontSizeLarge,
          t.radioLineHeightLarge,
          t.radioPaddingYLarge,
          t.radioSizeLarge,
        )};
      `;
    },

    rootIE11() {
      return emotion.css`
        display: inline-table;
      `;
    },

    rootChecked(t: Theme) {
      return emotion.css`
        &:hover .${globalClasses.circle} {
          background: ${t.radioCheckedHoverBgColor};
        }
      `;
    },

    circle(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        ${circleSizeMixin(emotion)(
          t.labGrotesqueBaselineCompensation,
          t.radioFontSizeSmall,
          t.radioSizeSmall,
          t.radioBorderWidthCompensation,
          t.radioCircleOffsetY,
        )};
      `;
    },
    circleMedium(t: Theme) {
      return emotion.css`
        ${circleSizeMixin(emotion)(
          t.labGrotesqueBaselineCompensation,
          t.radioFontSizeMedium,
          t.radioSizeMedium,
          t.radioBorderWidthCompensation,
          t.radioCircleOffsetY,
        )};
      `;
    },
    circleLarge(t: Theme) {
      return emotion.css`
        ${circleSizeMixin(emotion)(
          t.labGrotesqueBaselineCompensation,
          t.radioFontSizeLarge,
          t.radioSizeLarge,
          t.radioBorderWidthCompensation,
          t.radioCircleOffsetY,
        )};
      `;
    },

    focus(t: Theme) {
      return emotion.css`
        &::after {
          ${afterOutlineMixin(emotion)(t.radioOutlineWidth)};
          ${outlineColorMixin(emotion)(t.radioFocusShadow, t.radioBorderColorFocus)};
        }
      `;
    },

    warning(t: Theme) {
      return emotion.css`
        &::after {
          ${afterOutlineMixin(emotion)(t.radioOutlineWidth)};
          ${outlineColorMixin(emotion)(t.radioFocusShadow, t.radioBorderColorWarning)};
        }
      `;
    },

    error(t: Theme) {
      return emotion.css`
        &::after {
          ${afterOutlineMixin(emotion)(t.radioOutlineWidth)};
          ${outlineColorMixin(emotion)(t.radioFocusShadow, t.radioBorderColorError)};
        }
      `;
    },

    checked(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        ${radioCheckedMixin(emotion)(t.radioBulletSizeSmall)};
      `;
    },
    checkedMedium(t: Theme) {
      return emotion.css`
        ${radioCheckedMixin(emotion)(t.radioBulletSizeMedium)};
      `;
    },
    checkedLarge(t: Theme) {
      return emotion.css`
        ${radioCheckedMixin(emotion)(t.radioBulletSizeLarge)};
      `;
    },

    checkedDisabled(t: Theme) {
      return emotion.css`
        &::before {
          background: ${t.radioCheckedDisabledBulletBg};
        }
      `;
    },

    input() {
      return emotion.css`
        display: inline-block;
        height: 0;
        opacity: 0;
        position: absolute;
        width: 0;
        z-index: -1;
      `;
    },

    disabled(t: Theme) {
      return emotion.css`
        background: ${t.radioDisabledBg} !important; // override root hover/active styles
        border-color: transparent !important; // override root hover/active styles
        box-shadow: ${t.radioDisabledShadow} !important; // override root hover/active styles
      `;
    },

    caption(t: Theme) {
      return emotion.css`
        display: ${t.radioCaptionDisplay};
        padding-left: ${t.radioCaptionGap};
        white-space: normal;
        color: ${t.radioTextColor};
      `;
    },

    captionIE11() {
      return emotion.css`
        display: table-cell;
      `;
    },

    captionDisabled(t: Theme) {
      return emotion.css`
        color: ${t.textColorDisabled};
      `;
    },

    placeholder() {
      return emotion.css`
        display: inline-block;
      `;
    },
  });
