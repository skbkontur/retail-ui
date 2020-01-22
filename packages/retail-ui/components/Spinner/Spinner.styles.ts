import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';
import { SpinnerType } from './Spinner';

export const jsStyles = {
  cloudStroke(t: Theme) {
    return css`
      stroke: ${t.spinnerBgColor};
    `;
  },
  cloud(t: Theme) {
    return css`
      stroke: ${t.red};
      animation: ${AnimationKeyframes.spinnerCloudOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCloudLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
    `;
  },
  cloudDimmed(t: Theme) {
    return css`
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

  captionColor(t: Theme) {
    return css`
      color: ${t.spinnerCaptionColor};
    `;
  },

  caption(size: SpinnerType) {
    switch (size) {
      case 'mini':
        return css`
          margin-left: 8px;
          font-size: 14px;
        `;
      case 'big':
        return css`
          display: block;
          font-size: 18px;
          line-height: 1.33;
          margin-top: -8px;
        `;
      case 'normal':
      default:
        return css`
          display: block;
          font-size: 16px;
          line-height: 1.375;
          margin-top: -6px;
        `;
    }
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
