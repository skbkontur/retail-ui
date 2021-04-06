import { css } from '../../lib/theming/Emotion';
import { shift } from '../../lib/styles/DimensionFunctions';

const getBtnPadding = (fontSize: string, paddingY: string, paddingX: string, additionalOffset = 0): string => {
  let paddingTop = paddingY;
  let paddingBottom = paddingY;

  const shiftUp = (top: string, bottom: string, offset: number) => {
    return [shift(top, `${-offset}`), shift(bottom, `${offset}`)];
  };

  if (fontSize === '16px') {
    [paddingTop, paddingBottom] = shiftUp(paddingTop, paddingBottom, 1);
  }
  if (additionalOffset) {
    [paddingTop, paddingBottom] = shiftUp(paddingTop, paddingBottom, additionalOffset);
  }

  return `${paddingTop} ${paddingX} ${paddingBottom}`;
};

export const buttonUseMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  color: string,
  borderColor: string,
  borderBottomColor: string,
  borderWidth: string,
  selectorChecked: string,
  selectorArrow: string,
) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    background-color: ${hasGradient ? `initial` : btnBackground};
    background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
    color: ${color};
    border-color: ${borderColor};
    border-bottom-color: ${borderBottomColor};

    &:not(${selectorChecked}) ${selectorArrow} {
      box-shadow: ${borderWidth} 0 0 0 ${borderColor};
    }
  `;
};

export const buttonHoverMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  borderColor: string,
  borderBottomColor: string,
  borderWidth: string,
  selectorArrow: string,
) => {
  const hasGradient = btnBackgroundStart !== btnBackgroundEnd;
  return css`
    &:hover {
      background-color: ${hasGradient ? `initial` : btnBackground};
      background-image: ${hasGradient ? `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})` : `none`};
      border-color: ${borderColor};
      border-bottom-color: ${borderBottomColor};

      ${selectorArrow} {
        box-shadow: ${borderWidth} 0 0 ${borderColor};
      }
    }
  `;
};

export const buttonActiveMixin = (
  btnBackground: string,
  btnShadow: string,
  borderColor: string,
  borderTopColor: string,
  borderWidth: string,
  selectorActive: string,
  selectorArrow: string,
  selectorArrowTop: string,
  arrowBgImage: string,
) => {
  return css`
    &:active,
    &${selectorActive} {
      background-image: none;
      background-color: ${btnBackground};
      box-shadow: ${btnShadow};
      border-color: ${borderColor};
      border-top-color: ${borderTopColor};

      ${selectorArrow} {
        box-shadow: ${borderWidth} 0 0 ${borderColor};

        &${selectorArrowTop} {
          background-image: ${arrowBgImage} !important;
        }
      }
    }
  `;
};

export const buttonSizeMixin = (
  fontSize: string,
  height: string, // todo: remove, in IE broke screenshots without height
  lineHeight: string,
  paddingX: string,
  paddingY: string,
  selectorLink: string,
  selectorFallback: string,
) => {
  return css`
    font-size: ${fontSize} !important;

    &:not(${selectorLink}) {
      box-sizing: border-box;
      height: ${height};
      padding: ${getBtnPadding(fontSize, paddingY, paddingX)};
      line-height: ${lineHeight};

      &${selectorFallback} {
        padding: ${getBtnPadding(fontSize, paddingY, paddingX, 1)};
      }
    }
  `;
};

export const arrowOutlineMixin = (
  insetWidth: string,
  outlineColor: string,
  outlineWidth: string,
  insetColor: string,
  selectorArrow: string,
  selectorArrowTop: string,
  selectorArrowBottom: string,
) => {
  return css`
    ${selectorArrow} {
      &${selectorArrowTop} {
        box-shadow: inset -${insetWidth} ${insetWidth} 0 0 ${insetColor}, ${outlineWidth} 0 0 0 ${outlineColor} !important;
      }

      &${selectorArrowBottom} {
        box-shadow: inset -${insetWidth} -${insetWidth} 0 0 ${insetColor}, ${outlineWidth} 0 0 0 ${outlineColor} !important;
      }

      // don't hide inner outline
      // and keep the middle-line fix
      &:before {
        top: ${insetWidth};
        right: ${insetWidth};
        left: ${insetWidth};
      }
      &${selectorArrowBottom}:before {
        bottom: ${insetWidth};
      }
    }
  `;
};
