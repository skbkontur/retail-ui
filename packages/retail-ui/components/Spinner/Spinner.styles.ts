import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  cloudBg(t: ITheme) {
    return css`
      stroke: ${t.spinnerBgColor};
    `;
  },
  cloudStroke(t: ITheme) {
    return css`
      animation: 
        ${t.spinnerKeyframesCloudOffset} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${t.spinnerKeyframesCloudLength} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${t.spinnerKeyframesColor} 6s ease-in-out infinite;
    `;
  },
  cloudStrokeDimmed(t: ITheme) {
    return css`
      stroke: ${t.spinnerDimmedColor};
      animation: 
        ${t.spinnerKeyframesCloudOffset} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${t.spinnerKeyframesCloudLength} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite;
    `;
  },
  circle(t: ITheme) {
    return css`
      animation: 
        ${t.spinnerKeyframesCircleOffset} 1s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite,
        ${t.spinnerKeyframesCircleLength} 2s cubic-bezier(0.36, 0.14, 0.38, 0.69) infinite,
        ${t.spinnerKeyframesCircleRotate} 2s linear infinite;
    `;
  },
  circleStroke(t: ITheme) {
    return css`
      animation: ${t.spinnerKeyframesColor} 6s ease-in-out infinite;
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
