import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  cross(t: Theme) {
    return css`
      color: ${t.tooltipCloseBtnColor};
      cursor: pointer;
      height: ${t.tooltipCloseBtnSide};
      line-height: 0;
      padding: ${t.tooltipCloseBtnPadding};
      position: absolute;
      right: 0;
      top: 0;
      width: ${t.tooltipCloseBtnSide};
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
