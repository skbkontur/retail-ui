import { css } from '../../lib/theming/Emotion';
import classes from './Button.less';

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
    &:not(.${classes.checked}):not(.${classes.disabled}):not(.${classes.loading}):not(.${classes.link}) {
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
    }
  `;
};

