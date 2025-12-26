import { getLabGrotesqueBaselineCompensation } from '../../lib/styles/getLabGrotesqueBaselineCompensation';
import { isChrome, isFirefox } from '../../lib/client';

export const radioSizeMixin = (fontSize: string, lineHeight: string, paddingY: string, radioSize: string): string => {
  return `
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
): string => {
  const labGrotesqueCompenstation = parseInt(labGrotesqueBaselineCompensation);
  const radioFontSize = parseInt(fontSize);

  const baselineCompensation = getLabGrotesqueBaselineCompensation(
    radioFontSize,
    labGrotesqueCompenstation,
    isChrome,
    isFirefox,
  );
  const circleSize = `calc(${radioSize} - 2 * ${radioBorderWidthCompensation})`;
  const circleOffsetY = `calc(${radioCircleOffsetY} + ${radioBorderWidthCompensation} + ${baselineCompensation}px)`;
  const circleMarginX = radioBorderWidthCompensation;
  return `
    height: ${circleSize};
    width: ${circleSize};
    margin: ${circleOffsetY} ${circleMarginX} 0;
  `;
};

export const radioCheckedMixin = (bulletSize: string): string => {
  return `
    &::before {
      height: ${bulletSize};
      width: ${bulletSize};
    }
  `;
};

export const afterOutlineMixin = (radioOutlineWidth: string): string => {
  return `
    content: ' ';
    position: absolute;
    top: -${radioOutlineWidth};
    bottom: -${radioOutlineWidth};
    left: -${radioOutlineWidth};
    right: -${radioOutlineWidth};
    border-width: ${radioOutlineWidth};
    border-style: solid;
    border-radius: 50%;
    box-sizing: border-box;
  `;
};

export const outlineColorMixin = (shadow: string, borderColor: string): string => {
  return `
    box-shadow: ${shadow};
    border-color: ${borderColor};
  `;
};
