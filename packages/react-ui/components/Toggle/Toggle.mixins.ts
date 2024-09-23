import { css } from '../../lib/theming/Emotion';
import { isChrome } from '../../lib/client';

import { globalClasses } from './Toggle.styles';

export const toggleSizeMixin = (fontSize: string, toggleHeight: string, toggleWidth: string) => {
  return css`
    line-height: ${toggleHeight};
    font-size: ${fontSize};

    &::before {
      width: ${toggleWidth};
    }
  `;
};

export const buttonSizeMixin = (
  labGrotesqueBaselineCompensation: string,
  fontSize: string,
  toggleHeight: string,
  toggleWidth: string,
  toggleBorderRadius: string,
  toggleButtonOffsetY: string,
) => {
  const labGrotesqueCompenstation = parseInt(labGrotesqueBaselineCompensation);
  const buttonFontSize = parseInt(fontSize);
  const baselineCompensation = buttonFontSize <= 16 && isChrome ? -labGrotesqueCompenstation : 0;
  return css`
    height: ${toggleHeight};
    width: ${toggleWidth};
    flex: 1 0 ${toggleWidth};

    border-radius: ${toggleBorderRadius};
    line-height: ${toggleHeight};

    margin-top: calc(${toggleButtonOffsetY} + ${baselineCompensation}px);
  `;
};

export const captionSizeMixin = (fontSize: string, toggleHeight: string) => {
  return css`
    line-height: ${toggleHeight};
    font-size: ${fontSize};
  `;
};

export const handleMixin = (toggleHandleSize: string, toggleHandleBorderRadius: string) => {
  return css`
    border-radius: ${toggleHandleBorderRadius};
    height: ${toggleHandleSize};
    width: ${toggleHandleSize};
  `;
};

export const containerSizeMixin = (toggleBorderRadius: string) => {
  return css`
    border-radius: ${toggleBorderRadius};
  `;
};

export const inputSizeMixin = (toggleHeight: string, toggleWidth: string) => {
  const handleWidthWithBorders = toggleHeight;
  const height = parseInt(toggleHeight);
  return css`
    &:checked ~ .${globalClasses.containerDisabled} .${globalClasses.background} {
      border-radius: ${height * 0.5}px 0 0 ${height * 0.5}px;
    }
    &:checked ~ .${globalClasses.handle} {
      transform: translateX(${toggleWidth}) translateX(-${handleWidthWithBorders});
    }
  `;
};
