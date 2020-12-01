import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      font-size: 20px;
      line-height: normal; /* Button with icon has vertical offset without this. */
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
    `;
  },
  icon() {
    return css`
      width: 1em;
      height: 1em;
      margin-bottom: -0.2em;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
