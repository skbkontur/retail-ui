import { css } from '../../lib/theming/Emotion';
import { shift } from '../../lib/styles/DimensionFunctions';

import { ButtonStylesProps } from './Button';

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
  s: ButtonStylesProps,
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
) => {
  const { isArrowLeft, isChecked } = s;
  return css`
    background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
      ? btnBackground
      : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
    color: ${color};
    box-shadow: ${shadow};
    border: ${border};

    ${!isChecked
      ? `
          ${selectorArrow} {
            background: ${
              arrowBackgroundStart === arrowBackgroundEnd
                ? arrowBackgroundStart
                : `linear-gradient(to bottom right, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
            };
            box-shadow: ${getButtonArrowShadow(shadowArrow, s)};

            ${isArrowLeft &&
              `
              background: ${
                arrowBackgroundStart === arrowBackgroundEnd
                  ? arrowBackgroundStart
                  : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
              };
              box-shadow: ${getButtonArrowShadow(shadowArrowLeft, s)};
            `}
          }
      `
      : ``}
  `;
};

export const buttonHoverMixin = (
  s: ButtonStylesProps,
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
) => {
  const { isActive, isArrowLeft } = s;
  return css`
    ${!isActive
      ? `
        &:hover {
          background: ${
            btnBackgroundStart === btnBackgroundEnd && btnBackground
              ? btnBackground
              : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`
          };
          box-shadow: ${btnShadow};
          border-color: ${btnBorder};

          ${selectorArrow} {
            background: ${
              arrowBackgroundStart === arrowBackgroundEnd
                ? arrowBackgroundStart
                : `linear-gradient(to bottom right, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
            };
            box-shadow: ${getButtonArrowShadow(arrowShadow, s)};

            ${
              isArrowLeft
                ? `
                    background: ${
                      arrowBackgroundStart === arrowBackgroundEnd
                        ? arrowBackgroundStart
                        : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
                    };
                    box-shadow: ${getButtonArrowShadow(arrowLeftShadow, s)};
                  `
                : ``
            }
          }
        }
      `
      : ``}
  `;
};

export const buttonActiveMixin = (
  s: ButtonStylesProps,
  btnBackground: string,
  arrowBackground: string,
  arrowLeftBackground: string,
  btnShadow: string,
  arrowShadow: string,
  arrowLeftShadow: string,
  selectorArrow: string,
) => {
  const { isActive, isArrowLeft } = s;
  const activeStyles = css`
    background: ${btnBackground};
    box-shadow: ${btnShadow};

    ${selectorArrow} {
      background: ${arrowBackground};
      box-shadow: ${getButtonArrowShadow(arrowShadow, s)};

      ${isArrowLeft
        ? `
          background: ${arrowLeftBackground};
          box-shadow: ${getButtonArrowShadow(arrowLeftShadow, s)};
        `
        : ``}
    }
  `;
  return css`
    &:active {
      ${activeStyles}
    }

    ${isActive && activeStyles}
  `;
};

export const buttonSizeMixin = (
  s: ButtonStylesProps,
  fontSize: string,
  height: string,
  heightShift: string,
  lineHeight: string,
  paddingX: string,
  paddingY: string,
) => {
  const { isLink, isEdgeOrIE } = s;
  return css`
    font-size: ${fontSize};

    ${!isLink
      ? `
        height: ${shift(height, heightShift)};
        padding: ${getBtnPadding(fontSize, paddingY, paddingX, isEdgeOrIE ? 1 : 0)};
        line-height: ${c(lineHeight, isEdgeOrIE && `normal`)};
      `
      : ``}
  `;
};

export const buttonArrowMixin = (
  s: ButtonStylesProps,
  top: string,
  left: string,
  right: string,
  size: string,
  transform: string,
  selectorArrow: string,
) => {
  const { isArrowLeft } = s;
  return css`
    ${selectorArrow} {
      top: ${top};
      right: ${right};
      height: ${size};
      width: ${size};
      transform: ${transform};
      overflow: hidden;

      ${isArrowLeft
        ? `
          left: ${left};
          transform: rotate(232deg) skewX(25deg) skewY(8deg);
        `
        : ``}
    }
  `;
};

export const buttonLoadingArrowMixin = (
  s: ButtonStylesProps,
  top: string,
  leftArrowTop: string,
  left: string,
  height: string,
  background: string,
  delay: string,
  btn_loading_arrow: string,
  selectorArrow: string,
) => {
  const { isArrowLeft } = s;
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

      ${isArrowLeft
        ? `
        top: ${leftArrowTop};
        left: ${left};
        animation-direction: reverse;
        transform: translateX(42px) rotate(-44.3deg);
        animation-delay: ${delay};
      `
        : ``}
    }
  `;
};

export const buttonActiveCaptionMixin = (s: ButtonStylesProps) => {
  const { isLink, isDisabled } = s;
  return css`
    transform: ${c(!isLink && !isDisabled && `translateY(1px)`)};
  `;
};

export const c = (...args: Array<string | false>): string | undefined => {
  let result;
  for (const arg of args) {
    if (arg) {
      result = arg;
    }
  }
  return result;
};

const getButtonArrowShadow = (useColor: string, s: ButtonStylesProps) => {
  const { theme: t, isError, isWarning, isFocused } = s;
  return c(
    useColor,
    isError && `2px -2px 0 0 ${t.borderColorError}`,
    isWarning && `2px -2px 0 0 ${t.borderColorWarning}`,
    isFocused && `inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus}`,
    isFocused && isError && `inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError}`,
    isFocused && isWarning && `inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning}`,
  );
};
