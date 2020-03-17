import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';

const styles = {
  cloudStroke(t: Theme) {
    return css`
      stroke: ${t.spinnerBgColor};
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
      stroke: ${t.red};
      animation: ${AnimationKeyframes.spinnerCloudOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCloudLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
    `;
  },
  cloudDimmed(t: Theme) {
    return css`
      stroke-dasharray: 20, 86;
      stroke-dashoffset: 15;
      stroke: ${t.spinnerDimmedColor};
      animation: ${AnimationKeyframes.spinnerCloudOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCloudLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite;
    `;
  },
  circle(t: Theme) {
    return css`
      stroke: ${t.red};
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

  caption(t: Theme) {
    return css`
      font-size: 14px;
      color: ${t.spinnerCaptionColor};
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

  captionRight() {
    return css`
      margin-left: 5px;
    `;
  },

  captionBottom() {
    return css`
      display: block;
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
