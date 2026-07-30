import { isChrome, isFirefox } from '../../lib/client.js';
import { getLabGrotesqueBaselineCompensation } from '../../lib/styles/getLabGrotesqueBaselineCompensation.js';

export const checkboxSizeMixin = (
  fontSize: string,
  lineHeight: string,
  paddingY: string,
  checkboxBoxSize: string,
  paddingX: string,
): string => {
  return `
    line-height: ${lineHeight};
    font-size: ${fontSize};
    padding: ${paddingY} ${paddingX};

    &::before {
      width: ${checkboxBoxSize};
    }
  `;
};

export const boxWrapperSizeMixin = (
  labGrotesqueBaselineCompensation: string,
  fontSize: string,
  checkboxBoxSize: string,
  checkboxBoxOffsetY: string,
  checkboxPaddingX: string,
): string => {
  const labGrotesqueCompenstation = parseInt(labGrotesqueBaselineCompensation);
  const boxFontSize = parseInt(fontSize);
  const baselineCompensation = getLabGrotesqueBaselineCompensation(
    boxFontSize,
    labGrotesqueCompenstation,
    isChrome,
    isFirefox,
  );

  return `
    width: ${checkboxBoxSize};
    height: ${checkboxBoxSize};
    margin-top: calc(${checkboxBoxOffsetY} + ${baselineCompensation}px);
    left: ${checkboxPaddingX};
  `;
};

export const subcaptionMixin = (fontSize: string, lineHeight: string): string => {
  return `
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const disabledTextColorMixin = (textColor: string): string => {
  return `
    color: ${textColor};
  `;
};
