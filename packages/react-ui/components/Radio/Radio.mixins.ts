import type { Emotion } from '@emotion/css/create-instance';

import { getLabGrotesqueBaselineCompensation } from '../../lib/styles/getLabGrotesqueBaselineCompensation';
import { isChrome, isFirefox } from '../../lib/client';

export const radioSizeMixin =
  (emotion: Emotion) => (fontSize: string, lineHeight: string, paddingY: string, radioSize: string) => {
    return emotion.css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
    padding: ${paddingY} 0;
    &::before {
      width: ${radioSize};
    }
  `;
  };

export const circleSizeMixin =
  (emotion: Emotion) =>
  (
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
    );
    const circleSize = `calc(${radioSize} - 2 * ${radioBorderWidthCompensation})`;
    const circleOffsetY = `calc(${radioCircleOffsetY} + ${radioBorderWidthCompensation} + ${baselineCompensation}px)`;
    const circleMarginX = radioBorderWidthCompensation;
    return emotion.css`
    height: ${circleSize};
    width: ${circleSize};
    margin: ${circleOffsetY} ${circleMarginX} 0;
  `;
  };

export const radioCheckedMixin = (emotion: Emotion) => (bulletSize: string) => {
  return emotion.css`
    &::before {
      height: ${bulletSize};
      width: ${bulletSize};
    }
  `;
};

export const afterOutlineMixin = (emotion: Emotion) => (radioOutlineWidth: string) => {
  return emotion.css`
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

export const outlineColorMixin = (emotion: Emotion) => (shadow: string, borderColor: string) => {
  return emotion.css`
    box-shadow: ${shadow};
    border-color: ${borderColor};
  `;
};
