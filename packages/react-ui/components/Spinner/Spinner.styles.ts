import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { getAnimationKeyframes } from '../../lib/theming/AnimationKeyframes';
import { isIE11 } from '../../lib/client';

export const getStyles = (emotion: Emotion) => {
  const AnimationKeyframes = getAnimationKeyframes(emotion);
  return memoizeStyle({
    circle(t: Theme) {
      return emotion.css`
        stroke: ${t.spinnerColor};

        ${
          !isIE11 &&
          `
          animation: ${AnimationKeyframes.spinnerCircleOffset()} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
            ${AnimationKeyframes.spinnerCircleLength()} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
            ${AnimationKeyframes.spinnerCircleRotate()} 2s linear infinite,
            ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
        `
        }
      `;
    },
    circleDimmedColor(t: Theme) {
      return emotion.css`
        stroke: ${t.spinnerDimmedColor};
      `;
    },
    circleWithoutColorAnimation() {
      return emotion.css`
        ${
          !isIE11 &&
          `
          animation: ${AnimationKeyframes.spinnerCircleOffset()} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
          ${AnimationKeyframes.spinnerCircleLength()} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
          ${AnimationKeyframes.spinnerCircleRotate()} 2s linear infinite;
        `
        }
      `;
    },

    captionColor(t: Theme) {
      return emotion.css`
        color: ${t.spinnerCaptionColor};
      `;
    },

    inline() {
      return emotion.css`
        font-size: inherit;
        line-height: inherit;
      `;
    },

    mini(t: Theme) {
      return emotion.css`
        margin-left: ${t.spinnerCaptionGapSmall};
        font-size: ${t.spinnerFontSizeSmall};
        line-height: ${t.spinnerLineHeightSmall};
      `;
    },

    small(t: Theme) {
      return emotion.css`
        margin: ${t.spinnerCaptionMarginSmall};
        font-size: ${t.spinnerFontSizeSmall};
        line-height: ${t.spinnerLineHeightSmall};
      `;
    },

    normal(t: Theme) {
      return emotion.css`
        display: block;
        font-size: ${t.spinnerFontSizeMedium};
        line-height: ${t.spinnerLineHeightMedium};
        margin-top: ${t.spinnerCaptionGapMedium};
      `;
    },

    medium(t: Theme) {
      return emotion.css`
        margin: ${t.spinnerCaptionMarginMedium};
        font-size: ${t.spinnerFontSizeMedium};
        line-height: ${t.spinnerLineHeightMedium};
      `;
    },

    big(t: Theme) {
      return emotion.css`
        display: block;
        font-size: ${t.spinnerFontSizeLarge};
        line-height: ${t.spinnerLineHeightLarge};
        margin-top: ${t.spinnerCaptionGapLarge};
      `;
    },

    large(t: Theme) {
      return emotion.css`
        font-size: ${t.spinnerFontSizeLarge};
        line-height: ${t.spinnerLineHeightLarge};
        margin: ${t.spinnerCaptionMarginLarge};
      `;
    },

    spinner() {
      return emotion.css`
        display: inline-block;
        text-align: center;
        line-height: normal;
      `;
    },

    inner() {
      return emotion.css`
        display: inline-block;
      `;
    },
  });
};
