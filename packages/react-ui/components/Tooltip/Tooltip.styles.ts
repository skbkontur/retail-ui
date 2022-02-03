import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  cross(t: Theme) {
    return css`
      color: ${t.tooltipCloseBtnColor};
      cursor: pointer;
      height: 8px;
      line-height: 0;
      padding: ${t.tooltipCloseBtnPadding};
      position: absolute;
      right: 0;
      top: 0;
      width: 8px;
      box-sizing: content-box;

      &:hover {
        color: ${t.tooltipCloseBtnHoverColor};
      }
    `;
  },

  tooltipContent(t: Theme) {
    return css`
      color: ${t.tooltipTextColor};
      padding: ${t.tooltipPaddingY} ${t.tooltipPaddingX};
      position: relative;
      font-size: ${t.tooltipFontSize};
      line-height: ${t.tooltipLineHeight};
    `;
  },
});
