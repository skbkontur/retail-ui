import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';
import { isIE11 } from '../../lib/client';

const styles = {
  circle(t: Theme) {
    return css`
      stroke: ${t.spinnerColor};

      ${!isIE11 &&
        `
          animation: ${AnimationKeyframes.spinnerCircleOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
            ${AnimationKeyframes.spinnerCircleLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
            ${AnimationKeyframes.spinnerCircleRotate(t)} 2s linear infinite,
            ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
        `}
    `;
  },
  circleDimmed(t: Theme) {
    return css`
      stroke: ${t.spinnerDimmedColor};

      ${!isIE11 &&
        `
          animation: ${AnimationKeyframes.spinnerCircleOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
          ${AnimationKeyframes.spinnerCircleLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
          ${AnimationKeyframes.spinnerCircleRotate(t)} 2s linear infinite;
        `}
    `;
  },

  captionColor(t: Theme) {
    return css`
      color: ${t.spinnerCaptionColor};
    `;
  },

  mini(t: Theme) {
    return css`
      margin-left: ${t.spinnerCaptionGapSmall};
      font-size: ${t.spinnerFontSizeSmall};
      line-height: ${t.spinnerLineHeightSmall};
    `;
  },

  normal(t: Theme) {
    return css`
      display: block;
      font-size: ${t.spinnerFontSizeMedium};
      line-height: ${t.spinnerLineHeightMedium};
      margin-top: ${t.spinnerCaptionGapMedium};
    `;
  },

  big(t: Theme) {
    return css`
      display: block;
      font-size: ${t.spinnerFontSizeLarge};
      line-height: ${t.spinnerLineHeightLarge};
      margin-top: ${t.spinnerCaptionGapLarge};
    `;
  },

  spinner() {
    return css`
      display: inline-block;
      text-align: center;
    `;
  },

  inner() {
    return css`
      display: inline-block;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
