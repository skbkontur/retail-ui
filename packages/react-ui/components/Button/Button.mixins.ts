import { css } from '../../lib/theming/Emotion';
import { shift } from '../../lib/styles/DimensionFunctions';
import { isIE11, isEdge } from '../../lib/utils';

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
  arrowBackgroundStart: string,
  arrowBackgroundEnd: string,
  shadow: string,
  shadowArrow: string,
  shadowArrowLeft: string,
  color: string,
  border: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  return css`
    background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
      ? btnBackground
      : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
    color: ${color};
    box-shadow: ${shadow};
    border: ${border};

    ${selectorArrow} {
      ${isLeftArrow
        ? `
        background: ${
          arrowBackgroundStart === arrowBackgroundEnd
            ? arrowBackgroundStart
            : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
        };
        box-shadow: ${shadowArrowLeft};
      `
        : `
        background: ${
          arrowBackgroundStart === arrowBackgroundEnd
            ? arrowBackgroundStart
            : `linear-gradient(to bottom right, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
        };
        box-shadow: ${shadowArrow};
      `}
    }
  `;
};

export const buttonHoverMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  arrowBackgroundStart: string,
  arrowBackgroundEnd: string,
  btnShadow: string,
  arrowShadow: string,
  arrowLeftShadow: string,
  btnBorder: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  return css`
    &:hover {
      background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
        ? btnBackground
        : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
      box-shadow: ${btnShadow};
      border-color: ${btnBorder};

      ${selectorArrow} {
        ${isLeftArrow
          ? `
            background: ${
              arrowBackgroundStart === arrowBackgroundEnd
                ? arrowBackgroundStart
                : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
            };
            box-shadow: ${arrowLeftShadow};
          `
          : `
            background: ${
              arrowBackgroundStart === arrowBackgroundEnd
                ? arrowBackgroundStart
                : `linear-gradient(to bottom right, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
            };
            box-shadow: ${arrowShadow};
          `}
      }
    }
  `;
};

export const buttonActiveMixin = (
  btnBackground: string,
  arrowBackground: string,
  arrowLeftBackground: string,
  btnShadow: string,
  arrowShadow: string,
  arrowLeftShadow: string,
  isActive: boolean,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  const activeStyles = `
    background: ${btnBackground};
    box-shadow: ${btnShadow};

    ${selectorArrow} {
      ${
        isLeftArrow
          ? `
        background: ${arrowLeftBackground};
        box-shadow: ${arrowLeftShadow};
      `
          : `
        background: ${arrowBackground};
        box-shadow: ${arrowShadow};
      `
      }
    }
  `;
  return css`
    &:active {
      ${activeStyles};
    }
    ${isActive
      ? `
        &, &:hover {
          ${activeStyles};
        }
      `
      : ``}
  `;
};

export const buttonSizeMixin = (
  fontSize: string,
  height: string, // todo: remove, in IE broke screenshots without height
  heightShift: string, // todo: remove, in IE broke screenshots without height
  lineHeight: string,
  paddingX: string,
  paddingY: string,
  isLink: boolean,
) => {
  return css`
    font-size: ${fontSize};

    ${!isLink
      ? `
      box-sizing: border-box;
      height: ${shift(height, heightShift)};
      padding: ${getBtnPadding(fontSize, paddingY, paddingX)};
      line-height: ${lineHeight};

      ${
        isIE11 || isEdge
          ? `
        padding: ${getBtnPadding(fontSize, paddingY, paddingX, 1)};
        line-height: normal;
      `
          : ``
      }
    `
      : ``}
  `;
};

export const buttonArrowMixin = (
  top: string,
  left: string,
  right: string,
  size: string,
  transform: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  return css`
    ${selectorArrow} {
      top: ${top};
      right: ${right};
      height: ${size};
      width: ${size};
      transform: ${transform};
      overflow: hidden;

      ${isLeftArrow &&
        `
        left: ${left};
        transform: rotate(232deg) skewX(25deg) skewY(8deg);
      `}
    }
  `;
};

export const buttonLoadingArrowMixin = (
  top: string,
  leftArrowTop: string,
  left: string,
  height: string,
  background: string,
  delay: string,
  btn_loading_arrow: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  return css`
    ${selectorArrow}::before {
      content: '';
      display: block;
      position: absolute;
      top: ${top};
      left: -207px;
      right: -72px;
      height: ${height};
      background: ${background};
      background-size: 41px 100%;
      opacity: 0.2;
      transform: translateX(50px) rotate(-44.3deg);
      animation: ${btn_loading_arrow} 1s linear infinite;

      ${isLeftArrow &&
        `
        top: ${leftArrowTop};
        left: ${left};
        animation-direction: reverse;
        transform: translateX(42px) rotate(-44.3deg);
        animation-delay: ${delay};
      `}
    }
  `;
};
