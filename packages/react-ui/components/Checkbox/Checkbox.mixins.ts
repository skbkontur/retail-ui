import { css } from '../../lib/theming/Emotion';
import { isChrome, isFirefox } from '../../lib/client';
import { getLabGrotesqueBaselineCompensation } from '../../lib/styles/getLabGrotesqueBaselineCompensation';

export const checkboxSizeMixin = (fontSize: string, lineHeight: string, paddingY: string, checkboxBoxSize: string) => {
  return css`
    line-height: ${lineHeight};
    font-size: ${fontSize};
    padding: ${paddingY} 0;

    &::before {
      // non-breaking space.
      // makes a correct space for absolutely positioned box,
      // and also height and baseline for checkbox without caption.
      width: ${checkboxBoxSize};
    }
  `;
};

export const boxWrapperSizeMixin = (
  labGrotesqueBaselineCompensation: string,
  fontSize: string,
  checkboxBoxSize: string,
  checkboxBoxOffsetY: string,
) => {
  const labGrotesqueCompenstation = parseInt(labGrotesqueBaselineCompensation);
  const boxFontSize = parseInt(fontSize.slice(0, -2));
  const baselineCompensation =
    boxFontSize === 18 && (isFirefox || isChrome) // TODO: вынести условие в getLabGrotesqueBaselineCompensation, когда проп size будет добавлен для radio
      ? -labGrotesqueCompenstation
      : getLabGrotesqueBaselineCompensation(boxFontSize, labGrotesqueCompenstation, isChrome);

  return css`
    width: ${checkboxBoxSize};
    height: ${checkboxBoxSize};
    margin-top: calc(${checkboxBoxOffsetY} + ${baselineCompensation}px);
  `;
};
