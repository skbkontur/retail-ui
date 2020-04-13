import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';

const styles = {
  circle(t: Theme) {
    return css`
      stroke: ${t.spinnerColor};
      animation: ${AnimationKeyframes.spinnerCircleOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCircleLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerCircleRotate(t)} 2s linear infinite,
        ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
    `;
  },
  circleDimmed(t: Theme) {
    return css`
      stroke: ${t.spinnerDimmedColor};
      animation: ${AnimationKeyframes.spinnerCircleOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCircleLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerCircleRotate(t)} 2s linear infinite;
    `;
  },

  captionColor(t: Theme) {
    return css`
      color: ${t.spinnerCaptionColor};
    `;
  },

  mini(t: Theme) {
    return css`
      margin-left: ${t.spinnerPaddingXSmall};
      font-size: ${t.spinnerFontSizeSmall};
      line-height: ${t.spinnerLineHeightSmall};
    `;
  },

  normal(t: Theme) {
    return css`
      display: block;
      font-size: ${t.spinnerFontSizeMedium};
      line-height: ${t.spinnerLineHeightMedium};
      margin-top: ${t.spinnerPaddingYMedium};
    `;
  },

  big(t: Theme) {
    return css`
      display: block;
      font-size: ${t.spinnerFontSizeLarge};
      line-height: ${t.spinnerLineHeightLarge};
      margin-top: ${t.spinnerPaddingYLarge};
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

  fallback() {
    return css`
      display: inline-block;
      position: relative;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
