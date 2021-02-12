import { css, memoizeStyle } from '../../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      display: flex;
      align-items: center;
      height: 32px;
      width: 362px;
      padding: 0 12px 0 7px;
    `;
  }
};

export const jsStyles = memoizeStyle(styles);
