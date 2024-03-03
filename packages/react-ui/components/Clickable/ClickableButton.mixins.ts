import { shift } from '../../lib/styles/DimensionFunctions';
import { css } from '../../lib/theming/Emotion';

import { buttonGlobalClasses } from './ClickableButton.styles';

const getButtonPadding = ({
  fontSize,
  paddingY,
  paddingX,
  fontFamilyCompensation,
  additionalOffset = 0,
}: {
  fontSize: string;
  paddingY: string;
  paddingX: string;
  fontFamilyCompensation: string;
  additionalOffset?: number;
}): string => {
  let paddingTop = paddingY;
  let paddingBottom = paddingY;
  const offset = parseInt(fontFamilyCompensation) || 0;

  const shiftUp = (top: string, bottom: string, offset: number) => {
    return [shift(top, `${-offset}`), shift(bottom, `${offset}`)];
  };

  if (fontSize === '16px' && offset) {
    [paddingTop, paddingBottom] = shiftUp(paddingTop, paddingBottom, offset);
  }
  if (additionalOffset && offset) {
    [paddingTop, paddingBottom] = shiftUp(paddingTop, paddingBottom, additionalOffset);
  }

  return `${paddingTop} ${paddingX} ${paddingBottom}`;
};

export const buttonUseMixin = ({
  btnBackground,
  btnBackgroundStart,
  btnBackgroundEnd,
  color,
  borderColor,
  borderBottomColor,
  borderWidth,
}: {
  btnBackground: string;
  btnBackgroundStart?: string;
  btnBackgroundEnd?: string;
  color: string;
  borderColor: string;
  borderBottomColor?: string;
  borderWidth: string;
}) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    color: ${color};
    box-shadow: 0 0 0 ${borderWidth} ${borderColor}${borderBottomColor ? `, 0 ${borderWidth} 0 0 ${borderBottomColor}` : ``};

    :enabled:hover,
    :enabled {
      .${buttonGlobalClasses.icon} svg,
      .${buttonGlobalClasses.arrow} svg {
        color: ${color};
      }
    }
  `;
};

export const buttonHoverMixin = ({
  btnBackground,
  btnBackgroundStart,
  btnBackgroundEnd,
  borderColor,
  borderBottomColor,
  borderWidth,
}: {
  btnBackground: string;
  btnBackgroundStart?: string;
  btnBackgroundEnd?: string;
  borderColor: string;
  borderBottomColor?: string;
  borderWidth: string;
}) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    box-shadow: 0 0 0 ${borderWidth} ${borderColor}${borderBottomColor ? `, 0 ${borderWidth} 0 0 ${borderBottomColor}` : ``};
  `;
};

export const buttonActiveMixin = ({
  btnBackground,
  borderColor,
  borderTopColor,
  borderWidth,
}: {
  btnBackground: string;
  borderColor: string;
  borderTopColor?: string;
  borderWidth: string;
}) => {
  return css`
    &,
    &:hover {
      background-image: none !important; // override :hover styles
      background-color: ${btnBackground} !important; // override :hover styles
      box-shadow: 0 0 0 ${borderWidth} ${borderColor}${borderTopColor ? `, 0 -${borderWidth} 0 0 ${borderTopColor}` : ``} !important; // override :hover styles
    }
  `;
};

export const buttonSizeMixin = ({
  fontSize,
  lineHeight,
  paddingX,
  paddingY,
  fontFamilyCompensation,
}: {
  fontSize: string;
  lineHeight: string;
  paddingX: string;
  paddingY: string;
  fontFamilyCompensation: string;
}) => {
  return css`
    font-size: ${fontSize};
    box-sizing: border-box;
    padding: ${getButtonPadding({ fontSize, paddingY, paddingX, fontFamilyCompensation })};
    line-height: ${lineHeight};
  `;
};
