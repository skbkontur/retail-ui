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

