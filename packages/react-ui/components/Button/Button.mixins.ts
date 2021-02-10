import { Theme } from '../../lib/theming/Theme';
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
  shadowArrow: string,
  color: string,
  borderColor: string,
  selectorChecked: string,
  selectorArrow: string,
) => {
  return css`
    background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
      ? btnBackground
      : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
    color: ${color};
    border-color: ${borderColor};

    &:not(${selectorChecked}) ${selectorArrow} {
      [data-arrow-helper] {
        box-shadow: ${shadowArrow};
      }
    }
  `;
};

export const buttonHoverMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  arrowShadow: string,
  borderColor: string,
  selectorArrow: string,
) => {
  return css`
    &:hover {
      background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
        ? btnBackground
        : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
      border-color: ${borderColor};

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
  borderColor: string,
  selectorActive: string,
  selectorArrow: string,
  arrowActiveShadowGradient: string,
) => {
  return css`
    &:active,
    &${selectorActive} {
      background: ${btnBackground};
      box-shadow: ${btnShadow};
      border-color: ${borderColor};

      ${selectorArrow} {
        [data-arrow-helper] {
          background: inherit;
          box-shadow: ${arrowShadow};

          &:first-child {
            background-image: ${arrowActiveShadowGradient} !important;
          }
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

export const arrowFocusMixin = (t: Theme, borderColor: string) => {
  return css`
    box-shadow: inset 0 0 0 ${t.btnBorderWidth} ${t.btnOutlineColorFocus};

    [data-arrow-helper] {
      &:first-child {
        box-shadow: inset -${t.btnBorderWidth} ${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
          ${t.btnOutlineWidth} 0 0 0 ${borderColor} !important;
      }

      &:last-child {
        box-shadow: inset -${t.btnBorderWidth} -${t.btnBorderWidth} 0 0 ${t.btnOutlineColorFocus},
          ${t.btnOutlineWidth} 0 0 0 ${borderColor} !important;
      }

      // don't hide inner outline
      &:before {
        top: ${t.btnBorderWidth};
        right: ${t.btnBorderWidth};
        bottom: ${t.btnBorderWidth};
        left: ${t.btnBorderWidth};
      }
    }
  `;
};
