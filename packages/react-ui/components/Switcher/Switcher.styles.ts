import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  wrap() {
    return css`
      display: inline-block;
      vertical-align: middle;
    `;
  },

  input() {
    return css`
      height: 0;
      opacity: 0;
      position: absolute;
      width: 0;
    `;
  },

  label(t: Theme) {
    return css`
      color: ${t.switcherTextColor};
      vertical-align: middle;
      display: inline-block;
    `;
  },

  labelSmall(t: Theme) {
    return css`
      margin-right: ${t.switcherLabelGapSmall};
      font-size: ${t.switcherLabelFontSizeSmall};
      line-height: ${t.switcherLabelLineHeightSmall};
    `;
  },

  labelMedium(t: Theme) {
    return css`
      margin-right: ${t.switcherLabelGapMedium};
      font-size: ${t.switcherLabelFontSizeMedium};
      line-height: ${t.switcherLabelLineHeightMedium};
    `;
  },

  labelLarge(t: Theme) {
    return css`
      margin-right: ${t.switcherLabelGapLarge};
      font-size: ${t.switcherLabelFontSizeLarge};
      line-height: ${t.switcherLabelLineHeightLarge};
    `;
  },

  error(t: Theme) {
    const insideWidth = parseInt(t.btnBorderWidth);
    const outsideWidth = `${parseInt(t.switcherOutlineWidth) - insideWidth}px`;
    return css`
      border-radius: 2px;
      box-shadow: inset 0 0 0 ${insideWidth}px ${t.borderColorError}, 0 0 0 ${outsideWidth} ${t.borderColorError};
    `;
  },
});
