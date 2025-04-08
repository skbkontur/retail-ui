import type { Emotion } from '@emotion/css/create-instance';

import { globalClasses } from './Button.styles';

const getBtnPadding = (paddingY: string, paddingX: string): string => {
  return `${paddingY} ${paddingX} ${paddingY}`;
};

export const buttonUseMixin =
  (emotion: Emotion) =>
  (
    btnBackground: string,
    btnBackgroundStart: string,
    btnBackgroundEnd: string,
    color: string,
    borderColor: string,
    borderWidth: string,
  ) => {
    const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
    return emotion.css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    color: ${color};
    box-shadow: 0 0 0 ${borderWidth} ${borderColor};

    :enabled:hover,
    :enabled {
      .${globalClasses.arrow} svg {
        color: ${color};
      }
    }
  `;
  };

export const buttonHoverMixin =
  (emotion: Emotion) =>
  (
    btnBackground: string,
    btnBackgroundStart: string,
    btnBackgroundEnd: string,
    color: string,
    borderColor: string,
    borderWidth: string,
  ) => {
    const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
    return emotion.css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    box-shadow: 0 0 0 ${borderWidth} ${borderColor};
    color: ${color};
  `;
  };

export const buttonActiveMixin =
  (emotion: Emotion) => (btnBackground: string, btnShadow: string, borderColor: string, borderWidth: string) => {
    return emotion.css`
    &,
    &:hover {
      background-image: none !important; // override :hover styles
      background-color: ${btnBackground} !important; // override :hover styles
      box-shadow: 0 0 0 ${borderWidth} ${borderColor} !important; // override :hover styles

      .${globalClasses.innerShadow} {
        box-shadow: ${btnShadow};
      }
    }
  `;
  };

export const buttonSizeMixin =
  (emotion: Emotion) => (fontSize: string, lineHeight: string, paddingX: string, paddingY: string) => {
    return emotion.css`
    font-size: ${fontSize};
    box-sizing: border-box;
    padding: ${getBtnPadding(paddingY, paddingX)};
    line-height: ${lineHeight};
  `;
  };

export const buttonSizeMixinIE11 = (emotion: Emotion) => (paddingX: string, paddingY: string) => {
  return emotion.css`
    padding: ${getBtnPadding(paddingY, paddingX)};
    line-height: normal;
  `;
};
