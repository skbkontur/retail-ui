import { css } from '../../lib/theming/Emotion';
import { getLabGrotesqueBaselineCompensation } from '../../lib/styles/getLabGrotesqueBaselineCompensation';
import { isChrome, isFirefox } from '../../lib/client';

export const radioSizeMixin = (fontSize: string, lineHeight: string, paddingY: string, radioSize: string) => {
  return css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
    padding: ${paddingY} 0;
    &::before {
      width: ${radioSize};
    }
  `;
};

export const circleSizeMixin = (
  labGrotesqueBaselineCompensation: string,
  fontSize: string,
  radioSize: string,
  radioBorderWidthCompensation: string,
  radioCircleOffsetY: string,
) => {
  const labGrotesqueCompenstation = parseInt(labGrotesqueBaselineCompensation);
  const radioFontSize = parseInt(fontSize);

  const baselineCompensation = getLabGrotesqueBaselineCompensation(
    radioFontSize,
    labGrotesqueCompenstation,
    isChrome,
    isFirefox,
  ); // для firefox тоже поди надо
  const circleSize = `calc(${radioSize} - 2 * ${radioBorderWidthCompensation})`;
  const circleOffsetY = `calc(${radioCircleOffsetY} + ${radioBorderWidthCompensation} + ${baselineCompensation}px)`;
  const circleMarginX = radioBorderWidthCompensation;
  return css`
    height: ${circleSize};
    width: ${circleSize};
    margin: ${circleOffsetY} ${circleMarginX} 0;
  `;
};

export const radioCheckedMixin = (bulletSize: string) => {
  return css`
    &::before {
      height: ${bulletSize};
      width: ${bulletSize};
    }
  `;
};

export const afterOutline = (radioSizeAfter: string) => {
  return css`
    width: ${radioSizeAfter};
    height: ${radioSizeAfter};
  `;
};
