import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  cross(t: Theme) {
    return css`
      color: ${t.tooltipCloseBtnColor};
      cursor: pointer;
      height: 8px;
      line-height: 0;
      padding: ${t.tooltipCloseBtnPadding};
      position: absolute;
      right: ${t.tooltipCloseBtnPadding};
      top: ${t.tooltipCloseBtnPadding};
      width: 8px;
      box-sizing: content-box;

      &:hover {
        color: ${t.tooltipCloseBtnHoverColor};
      }
    `;
  },

  tooltipContent(t: Theme) {
    return css`
      padding: ${t.tooltipPaddingY} ${t.tooltipPaddingX};
      position: relative;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
