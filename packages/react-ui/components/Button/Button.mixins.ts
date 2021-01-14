import { Theme } from 'react-ui/lib/theming/Theme';

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
  shadow: string,
  shadowArrow: string,
  color: string,
  border: string,
  selectorChecked: string,
  selectorArrow: string,
) => {
  return css`
    background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
      ? btnBackground
      : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
    color: ${color};
    box-shadow: ${shadow};
    border: ${border};

    &:not(${selectorChecked}) ${selectorArrow} {
      &:before,
      &:after {
        box-shadow: ${shadowArrow};
      }
    }
  `;
};

export const buttonHoverMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  btnShadow: string,
  arrowShadow: string,
  btnBorder: string,
  selectorArrow: string,
) => {
  return css`
    &:hover {
      background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
        ? btnBackground
        : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
      box-shadow: ${btnShadow};
      border-color: ${btnBorder};

      ${selectorArrow} {
        &:before,
        &:after {
          box-shadow: ${arrowShadow};
        }
      }
    }
  `;
};

export const buttonActiveMixin = (
  btnBackground: string,
  btnShadow: string,
  arrowShadow: string,
  selectorActive: string,
  selectorArrow: string,
  arrowActiveShadowGradient: string,
) => {
  return css`
    &:active,
    &${selectorActive} {
      background: ${btnBackground};
      box-shadow: ${btnShadow};

      ${selectorArrow} {
        &:before,
        &:after {
          background: inherit;
          box-shadow: ${arrowShadow};
        }

        &:before {
          background-image: ${arrowActiveShadowGradient};
        }
      }
    }
  `;
};

export const buttonSizeMixin = (
  fontSize: string,
  height: string, // todo: remove, in IE broke screenshots without height
  heightShift: string, // todo: remove, in IE broke screenshots without height
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
      height: ${shift(height, heightShift)};
      padding: ${getBtnPadding(fontSize, paddingY, paddingX)};
      line-height: ${lineHeight};

      &${selectorFallback} {
        padding: ${getBtnPadding(fontSize, paddingY, paddingX, 1)};
      }
    }
  `;
};

export const arrowFocusMixin = (t: Theme, borderColor: string) => {
  return css`
    &:before {
      box-shadow: inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
        ${t.btnOutlineWidth} 0 0 0 ${borderColor} !important;
    }

    &:after {
      box-shadow: inset -${t.btnBorderWidth} -${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
        ${t.btnOutlineWidth} 0 0 0 ${borderColor} !important;
    }
  `;
};
