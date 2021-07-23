import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  inputTypeDate() {
    return css`
      width: 0px;
      height: 0px;
      padding: 0px;
      margin: 0px;
      line-height: 0px;
      transform: scale(0);
      border: none;
      overflow: hidden;
      opacity: 0;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
