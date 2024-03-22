import { css } from '../../lib/theming/Emotion';
import { shift } from '../../lib/styles/DimensionFunctions';

import { globalClasses } from './Button.styles';

const getBtnPadding = ({
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
}: Record<string, string>) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    color: ${color};
    box-shadow: 0 0 0 ${borderWidth} ${borderColor}${borderBottomColor ? `, 0 ${borderWidth} 0 0 ${borderBottomColor}` : ``};

    .${globalClasses.arrowHelper} {
      box-shadow: ${borderWidth} 0 0 0 ${borderColor};
    }

    :enabled:hover,
    :enabled {
      .${globalClasses.icon} svg,
      .${globalClasses.arrow} svg {
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
  color,
  borderBottomColor,
  borderWidth,
}: Record<string, string>) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    box-shadow: 0 0 0 ${borderWidth} ${borderColor}${borderBottomColor ? `, 0 ${borderWidth} 0 0 ${borderBottomColor}` : ``};
    color: ${color};

    .${globalClasses.arrowHelper} {
      box-shadow: ${borderWidth} 0 0 ${borderColor};
    }
  `;
};

export const buttonActiveMixin = ({
  btnBackground,
  btnShadow,
  borderColor,
  borderTopColor,
  borderWidth,
  arrowBgImage,
}: Record<string, string>) => {
  return css`
    &,
    &:hover {
      background-image: none !important; // override :hover styles
      background-color: ${btnBackground} !important; // override :hover styles
      box-shadow: 0 0 0 ${borderWidth} ${borderColor}${borderTopColor ? `, 0 -${borderWidth} 0 0 ${borderTopColor}` : ``} !important; // override :hover styles

      .${globalClasses.innerShadow} {
        box-shadow: ${btnShadow};
      }

      .${globalClasses.arrowHelper} {
        box-shadow: ${borderWidth} 0 0 ${borderColor};

        &.${globalClasses.arrowHelperTop} {
          background-image: ${arrowBgImage};
        }
      }
    }
  `;
};

export const buttonSizeMixin = ({
  fontSize,
  lineHeight,
  paddingX,
  paddingY,
  fontFamilyCompensation,
}: Record<string, string>) => {
  return css`
    font-size: ${fontSize};
    box-sizing: border-box;
    padding: ${getBtnPadding({ fontSize, paddingY, paddingX, fontFamilyCompensation })};
    line-height: ${lineHeight};
  `;
};

export const buttonSizeMixinIE11 = ({
  fontSize,
  paddingX,
  paddingY,
  fontFamilyCompensation,
}: Record<string, string>) => {
  return css`
    padding: ${getBtnPadding({ fontSize, paddingY, paddingX, fontFamilyCompensation, additionalOffset: 1 })};
    line-height: normal;
  `;
};

export const arrowOutlineMixin = ({ insetWidth, outlineColor, outlineWidth, insetColor }: Record<string, string>) => {
  return css`
    .${globalClasses.arrowHelper} {
      &.${globalClasses.arrowHelperTop} {
        box-shadow: inset -${insetWidth} ${insetWidth} 0 0 ${insetColor}, ${outlineWidth} 0 0 0 ${outlineColor} !important; // override :active styles
      }

      &.${globalClasses.arrowHelperBottom} {
        box-shadow: inset -${insetWidth} -${insetWidth} 0 0 ${insetColor}, ${outlineWidth} 0 0 0 ${outlineColor} !important; // override :active styles
      }

      // don't hide inner outline
      // and keep the middle-line fix
      &:before {
        top: ${insetWidth};
        right: ${insetWidth};
        left: ${insetWidth};
      }
      &.${globalClasses.arrowHelperBottom}:before {
        bottom: ${insetWidth};
      }
    }
  `;
};
