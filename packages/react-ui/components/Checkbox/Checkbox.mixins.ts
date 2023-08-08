import { css } from '../../lib/theming/Emotion';
// import {isChrome} from "../../lib/client";
import {getLabGrotesqueBaselineCompensation} from "../../lib/styles/getLabGrotesqueBaselineCompensation";

import { globalClasses } from './Checkbox.styles';

export const checkboxSizeMixin = (
  fontSize: string,
  lineHeight: string,
  paddingY: string,
  checkboxBoxSize: string,
) => {
  return css`
    display: inline-flex;
    align-items: baseline;
    cursor: pointer;
    position: relative;
    line-height: ${lineHeight};
    font-size: ${fontSize};
    padding: ${paddingY} 0;

    &::before {
      // non-breaking space.
      // makes a correct space for absolutely positioned box,
      // and also height and baseline for checkbox without caption.
      content: '\\00A0';
      display: inline-block;
      width: ${checkboxBoxSize};
      flex: 0 0 auto;
    }
  `;
};

export const boxMixin = (
  transitionDuration: string,
  transitionTimingFunction: string,
  checkboxHoverBg: string,
  checkboxShadowHover: string,
  checkboxShadowActive: string,
  checkboxActiveBg: string,
) => {
  return css`
    .${globalClasses.box} {
      transition: background ${transitionDuration} ${transitionTimingFunction},
        box-shadow ${transitionDuration} ${transitionTimingFunction};
    }

    &:hover .${globalClasses.box} {
      background: ${checkboxHoverBg};
      box-shadow: ${checkboxShadowHover};
    }

    &:active .${globalClasses.box} {
      box-shadow: ${checkboxShadowActive};
      background: ${checkboxActiveBg};
    }
  `;
};

export const boxWrapperMixin = (
  labGrotesqueBaselineCompensation: string,
  fontSize: string,
  checkboxBoxSize: string,
  checkboxBorderWidth: string,
  checkboxBoxOffsetY: string,
) => {
  const labGrotesqueCompenstation = parseInt(labGrotesqueBaselineCompensation);
  const boxFontSize = parseInt(fontSize.slice(0, -2));
  const baselineCompensation= getLabGrotesqueBaselineCompensation(boxFontSize, labGrotesqueCompenstation, true);

  return css`
    position: absolute;
    width: ${checkboxBoxSize};
    height: ${checkboxBoxSize};
    box-sizing: border-box;
    padding: ${checkboxBorderWidth};
    margin-top: calc(${checkboxBoxOffsetY} + ${baselineCompensation}px);

    // fix position in ie11
    display: inline-block;
    left: 0;
  `;
};
