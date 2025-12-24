import { css } from '../../lib/theming/Emotion';
import { isChrome, isFirefox } from '../../lib/client';
import { getLabGrotesqueBaselineCompensation } from '../../lib/styles/getLabGrotesqueBaselineCompensation';

export const checkboxSizeMixin = (
  fontSize: string,
  lineHeight: string,
  paddingY: string,
  checkboxBoxSize: string,
  paddingX: string,
) => {
  return css`
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
) => {
  const labGrotesqueCompenstation = parseInt(labGrotesqueBaselineCompensation);
  const boxFontSize = parseInt(fontSize);
  const baselineCompensation = getLabGrotesqueBaselineCompensation(
    boxFontSize,
    labGrotesqueCompenstation,
    isChrome,
    isFirefox,
  );

  return css`
    width: ${checkboxBoxSize};
    height: ${checkboxBoxSize};
    margin-top: calc(${checkboxBoxOffsetY} + ${baselineCompensation}px);
    left: ${checkboxPaddingX};
  `;
};
