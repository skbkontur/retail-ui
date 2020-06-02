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
  arrowBackgroundStart: string,
  arrowBackgroundEnd: string,
  shadow: string,
  shadowArrow: string,
  shadowArrowLeft: string,
  color: string,
  border: string,
  checked: boolean,
  selectorArrow: string,
  s: any,
) => {
  const isArrowLeft = s.props.arrow === 'left';
  return css`
    background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
      ? btnBackground
      : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
    color: ${color};
    box-shadow: ${shadow};
    border: ${border};

    ${!checked &&
      `
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
    `}
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
  s: any,
) => {
  const isActive = s.props.active;
  const isArrowLeft = s.props.arrow === 'left';
  return css`
    ${!isActive &&
      `
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

          ${isArrowLeft &&
            `
            background: ${
              arrowBackgroundStart === arrowBackgroundEnd
                ? arrowBackgroundStart
                : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
            };
            box-shadow: ${getButtonArrowShadow(arrowLeftShadow, s)};
          `}
        }
      }
    `}
  `;
};

export const buttonActiveMixin = (
  btnBackground: string,
  arrowBackground: string,
  arrowLeftBackground: string,
  btnShadow: string,
  arrowShadow: string,
  arrowLeftShadow: string,
  selectorArrow: string,
  s: any,
) => {
  const isActive = s.props.active;
  const isArrowLeft = s.props.arrow === 'left';
  const activeStyles = css`
    background: ${btnBackground};
    box-shadow: ${btnShadow};

    ${selectorArrow} {
      background: ${arrowBackground};
      box-shadow: ${getButtonArrowShadow(arrowShadow, s)};

      ${isArrowLeft &&
        `
        background: ${arrowLeftBackground};
        box-shadow: ${getButtonArrowShadow(arrowLeftShadow, s)};
      `}
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
  fontSize: string,
  height: string,
  heightShift: string,
  lineHeight: string,
  paddingX: string,
  paddingY: string,
  isFallback: boolean,
  isLink: boolean,
) => {
  return css`
    font-size: ${fontSize};

    ${!isLink
      ? `
        height: ${shift(height, heightShift)};
        padding: ${getBtnPadding(fontSize, paddingY, paddingX)};
        line-height: ${lineHeight};

        ${isFallback &&
          `
          padding: ${getBtnPadding(fontSize, paddingY, paddingX, 1)};
          line-height: normal;
        `}
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
  isArrowLeft: boolean,
) => {
  console.log(isArrowLeft);
  return css`
    ${selectorArrow} {
      top: ${top};
      right: ${right};
      height: ${size};
      width: ${size};
      transform: ${transform};
      overflow: hidden;

      ${isArrowLeft &&
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
  isArrowLeft: boolean,
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

      ${isArrowLeft &&
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

export const buttonActiveCaptionMixin = (s: any) => {
  const { use, disabled } = s.props;
  const link = use === 'link';
  return css`
    transform: ${c(!link && !disabled && `translateY(1px)`)};
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

const getButtonArrowShadow = (useColor: string, s: any): string => {
  const { theme: t } = s;
  const { error, warning, visuallyFocused } = s.props;
  const focus = s.state.focusedByTab || !!visuallyFocused;
  if (focus) {
    if (error) {
      return `inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorError}`;
    }
    if (warning) {
      return `inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorWarning}`;
    }
    return `inset -1px 1px 0 0 ${t.outlineColorFocus}, 2px -2px 0 0 ${t.borderColorFocus}`;
  }
  if (error) {
    return `2px -2px 0 0 ${t.borderColorError}`;
  }
  if (warning) {
    return `2px -2px 0 0 ${t.borderColorWarning}`;
  }
  return useColor;
};
