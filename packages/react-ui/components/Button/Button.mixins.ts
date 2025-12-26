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
): string => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return `
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
): string => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return `
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
): string => {
  return `
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

export const buttonSizeMixin = (fontSize: string, lineHeight: string, paddingX: string, paddingY: string): string => {
  return `
    font-size: ${fontSize};
    box-sizing: border-box;
    padding: ${getBtnPadding(paddingY, paddingX)};
    line-height: ${lineHeight};
  `;
};
