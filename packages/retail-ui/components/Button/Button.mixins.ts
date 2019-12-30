import { css } from '../../lib/theming/Emotion';
import classes from './Button.module.less';
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
) => {
  return css`
    background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
      ? btnBackground
      : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
    color: ${color};
    box-shadow: ${shadow};
    border: ${border};

    .${classes.arrow} {
      background: ${arrowBackgroundStart === arrowBackgroundEnd
        ? arrowBackgroundStart
        : `linear-gradient(to bottom right, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`};
      box-shadow: ${shadowArrow};
    }

    .${classes.arrow_left} {
      background: ${arrowBackgroundStart === arrowBackgroundEnd
        ? arrowBackgroundStart
        : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`};
      box-shadow: ${shadowArrowLeft};
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
) => {
  return css`
    &:hover {
      background: ${btnBackgroundStart === btnBackgroundEnd && btnBackground
        ? btnBackground
        : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`};
      box-shadow: ${btnShadow};
      border-color: ${btnBorder};

      .${classes.arrow} {
        background: ${arrowBackgroundStart === arrowBackgroundEnd
          ? arrowBackgroundStart
          : `linear-gradient(to bottom right, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`};
        box-shadow: ${arrowShadow};
      }

      .${classes.arrow_left} {
        background: ${arrowBackgroundStart === arrowBackgroundEnd
          ? arrowBackgroundStart
          : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`};
        box-shadow: ${arrowLeftShadow};
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
) => {
  return css`
    &:active,
    &.${classes.active} {
      background: ${btnBackground};
      box-shadow: ${btnShadow};

      .${classes.arrow} {
        background: ${arrowBackground};
        box-shadow: ${arrowShadow};
      }

      .${classes.arrow_left} {
        background: ${arrowLeftBackground};
        box-shadow: ${arrowLeftShadow};
      }
    }
  `;
};

export const buttonSizeMixin = (
  fontSize: string,
  height: string,
  heightShift: string,
  lineHeight: string,
  paddingX: string,
  paddingY: string,
) => {
  return css`
    font-size: ${fontSize};

    &:not(.${classes.link}) {
      height: ${shift(height, heightShift)};
      padding: ${getBtnPadding(fontSize, paddingY, paddingX)};
      line-height: ${lineHeight};

      .rt-ie-any & {
        padding: ${getBtnPadding(fontSize, paddingY, paddingX, 1)};
      }
    }
  `;
};

export const buttonArrowMixin = (top: string, left: string, right: string, size: string, transform: string) => {
  return css`
    .${classes.arrow} {
      top: ${top};
      right: ${right};
      height: ${size};
      width: ${size};
      transform: ${transform};
      overflow: hidden;
    }

    .${classes.arrow_left} {
      left: ${left};
      transform: rotate(232deg) skewX(25deg) skewY(8deg) !important;
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
) => {
  return css`
    .${classes.arrow}.${classes.arrow_loading}::before {
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
    }

    .${classes.arrow_left}.${classes.arrow_loading}::before {
      top: ${leftArrowTop};
      left: ${left};
      animation-direction: reverse;
      transform: translateX(42px) rotate(-44.3deg);
      animation-delay: ${delay};
    }
  `;
};
