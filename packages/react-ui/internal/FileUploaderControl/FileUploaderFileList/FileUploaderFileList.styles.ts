import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

const styles = {
  file() {
    return css`
      width: 100%;
    `;
  },
  fileWrapper(t: Theme) {
    return css`
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: ${t.fileUploaderPaddingY} ${t.fileUploaderPaddingX};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
