import { css } from '../../lib/theming/Emotion';

import { globalClasses } from './Button.styles';

const getBtnPadding = (paddingY: string, paddingX: string): string => {
  return `${paddingY} ${paddingX} ${paddingY}`;
};

export const buttonUseMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  color: string,
  borderColor: string,
  borderWidth: string,
) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
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

export const buttonHoverMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  color: string,
  borderColor: string,
  borderWidth: string,
) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    box-shadow: 0 0 0 ${borderWidth} ${borderColor};
    color: ${color};
  `;
};

export const buttonActiveMixin = (
  btnBackground: string,
  btnShadow: string,
  borderColor: string,
  borderWidth: string,
) => {
  return css`
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

export const buttonSizeMixin = (fontSize: string, lineHeight: string, paddingX: string, paddingY: string) => {
  return css`
    font-size: ${fontSize};
    box-sizing: border-box;
    padding: ${getBtnPadding(paddingY, paddingX)};
    line-height: ${lineHeight};
  `;
};

export const buttonSizeMixinIE11 = (paddingX: string, paddingY: string) => {
  return css`
    padding: ${getBtnPadding(paddingY, paddingX)};
    line-height: normal;
  `;
};
