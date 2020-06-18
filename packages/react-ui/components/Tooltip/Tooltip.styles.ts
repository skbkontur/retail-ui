import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  cross(t: Theme) {
    return css`
      color: ${t.tooltipCloseBtnColor};
      cursor: pointer;
      height: 8px;
      line-height: 0;
      padding: 4px;
      position: absolute;
      right: 4px;
      top: 4px;
      width: 8px;
      box-sizing: content-box;

      &:hover {
        color: ${t.tooltipCloseBtnHoverColor};
      }
    `;
  },

  tooltipContent() {
    return css`
      padding: 15px 20px;
      position: relative;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
