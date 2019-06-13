import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import { AnimationKeyframes } from '../../lib/theming/AnimationKeyframes';

const jsStyles = {
  cloudBg(t: ITheme) {
    return css`
      stroke: ${t.spinnerBgColor};
    `;
  },
  cloudStroke(t: ITheme) {
    return css`
      animation: ${AnimationKeyframes.spinnerCloudOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCloudLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
    `;
  },
  cloudStrokeDimmed(t: ITheme) {
    return css`
      stroke: ${t.spinnerDimmedColor};
      animation: ${AnimationKeyframes.spinnerCloudOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCloudLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite;
    `;
  },
  circle(t: ITheme) {
    return css`
      stroke: ${t.red};
      animation: ${AnimationKeyframes.spinnerCircleOffset(t)} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${AnimationKeyframes.spinnerCircleLength(t)} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${AnimationKeyframes.spinnerCircleRotate(t)} 2s linear infinite;
    `;
  },
  circleStroke(t: ITheme) {
    return css`
      animation: ${AnimationKeyframes.spinnerColor(t)} 6s ease-in-out infinite;
    `;
  },
  circleStrokeDimmed(t: ITheme) {
    return css`
      stroke: ${t.spinnerDimmedColor};
    `;
  },

  caption(t: ITheme) {
    return css`
      color: ${t.spinnerCaptionColor};
    `;
  },
};

export default jsStyles;
