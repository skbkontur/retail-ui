import type { Emotion } from '@emotion/css/create-instance';

import { isChrome } from '../../lib/client';

import { globalClasses } from './Toggle.styles';

export const toggleSizeMixin = (emotion: Emotion) => (fontSize: string, toggleHeight: string, toggleWidth: string) => {
  return emotion.css`
    line-height: ${toggleHeight};
    font-size: ${fontSize};

    &::before {
      width: ${toggleWidth};
    }
  `;
};

export const buttonSizeMixin =
  (emotion: Emotion) =>
  (
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
    return emotion.css`
    height: ${toggleHeight};
    width: ${toggleWidth};
    flex: 1 0 ${toggleWidth};

    border-radius: ${toggleBorderRadius};
    line-height: ${toggleHeight};

    margin-top: calc(${toggleButtonOffsetY} + ${baselineCompensation}px);
  `;
  };

export const captionSizeMixin = (emotion: Emotion) => (fontSize: string, toggleHeight: string) => {
  return emotion.css`
    line-height: ${toggleHeight};
    font-size: ${fontSize};
  `;
};

export const handleMixin = (emotion: Emotion) => (toggleHandleSize: string, toggleHandleBorderRadius: string) => {
  return emotion.css`
    border-radius: ${toggleHandleBorderRadius};
    height: ${toggleHandleSize};
    width: ${toggleHandleSize};
  `;
};

export const containerSizeMixin = (emotion: Emotion) => (toggleBorderRadius: string) => {
  return emotion.css`
    border-radius: ${toggleBorderRadius};
  `;
};

export const inputSizeMixin = (emotion: Emotion) => (toggleHeight: string, toggleWidth: string) => {
  const handleWidthWithBorders = toggleHeight;
  const height = parseInt(toggleHeight);
  return emotion.css`
    &:checked ~ .${globalClasses.containerDisabled} .${globalClasses.background} {
      border-radius: ${height * 0.5}px 0 0 ${height * 0.5}px;
    }
    &:checked ~ .${globalClasses.handle} {
      transform: translateX(${toggleWidth}) translateX(-${handleWidthWithBorders});
    }
  `;
};
