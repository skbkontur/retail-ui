import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  fileWrapper() {
    return css`
      width: 362px;
      padding: 0 12px 0 7px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
