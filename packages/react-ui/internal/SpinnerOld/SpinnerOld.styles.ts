import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';

const styles = {
  cloudStroke(t: Theme) {
    return css`
      stroke: ${t.spinnerOldBgColor};
    `;
  },
  cloudWrapper() {
    return css`
      fill: none;
      stroke-linecap: round;
    `;
  },
  cloud(t: Theme) {
    return css`
      stroke-dasharray: 20, 86;
      stroke-dashoffset: 15;
      stroke: ${t.spinnerColor};
      animation: ${AnimationKeyframes.spinnerCloudOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCloudLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
    `;
  },
  cloudDimmed(t: Theme) {
    return css`
      stroke-dasharray: 20, 86;
      stroke-dashoffset: 15;
      stroke: ${t.spinnerOldDimmedColor};
      animation: ${AnimationKeyframes.spinnerCloudOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCloudLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite;
    `;
  },
  circle(t: Theme) {
    return css`
      stroke: ${t.spinnerOldColor};
      animation: ${AnimationKeyframes.spinnerCircleOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCircleLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerCircleRotate(t)} 2s linear infinite,
        ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
    `;
  },
  circleDimmed(t: Theme) {
    return css`
      stroke: ${t.spinnerOldDimmedColor};
      animation: ${AnimationKeyframes.spinnerCircleOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCircleLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerCircleRotate(t)} 2s linear infinite;
    `;
  },

  caption(t: Theme) {
    return css`
      color: ${t.spinnerOldCaptionColor};
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

  mini(t: Theme) {
    return css`
      margin-left: ${t.spinnerOldPaddingXSmall};
      font-size: ${t.spinnerOldFontSizeSmall};
      line-height: ${t.spinnerOldLineHeightSmall};
    `;
  },

  normal(t: Theme) {
    return css`
      display: block;
      font-size: ${t.spinnerOldFontSizeMedium};
      line-height: ${t.spinnerOldLineHeightMedium};
      margin-top: ${t.spinnerOldPaddingYMedium};
    `;
  },

  big(t: Theme) {
    return css`
      display: block;
      font-size: ${t.spinnerOldFontSizeLarge};
      line-height: ${t.spinnerOldLineHeightLarge};
      margin-top: ${t.spinnerOldPaddingYLarge};
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
