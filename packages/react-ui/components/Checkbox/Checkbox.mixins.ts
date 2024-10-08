import type { Emotion } from '@emotion/css/create-instance';

import { isChrome, isFirefox } from '../../lib/client';
import { getLabGrotesqueBaselineCompensation } from '../../lib/styles/getLabGrotesqueBaselineCompensation';

export const checkboxSizeMixin =
  (emotion: Emotion) => (fontSize: string, lineHeight: string, paddingY: string, checkboxBoxSize: string) => {
    return emotion.css`
    line-height: ${lineHeight};
    font-size: ${fontSize};
    padding: ${paddingY} 0;

    &::before {
      width: ${checkboxBoxSize};
    }
  `;
  };

export const boxWrapperSizeMixin =
  (emotion: Emotion) =>
  (labGrotesqueBaselineCompensation: string, fontSize: string, checkboxBoxSize: string, checkboxBoxOffsetY: string) => {
    const labGrotesqueCompenstation = parseInt(labGrotesqueBaselineCompensation);
    const boxFontSize = parseInt(fontSize);
    const baselineCompensation = getLabGrotesqueBaselineCompensation(
      boxFontSize,
      labGrotesqueCompenstation,
      isChrome,
      isFirefox,
    );

    return emotion.css`
    width: ${checkboxBoxSize};
    height: ${checkboxBoxSize};
    margin-top: calc(${checkboxBoxOffsetY} + ${baselineCompensation}px);
  `;
  };
