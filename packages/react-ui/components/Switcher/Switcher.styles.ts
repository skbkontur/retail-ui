import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css`
      line-height: normal;
    `;
  },

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
    return css`
      border-radius: 2px;
      box-shadow: 0 0 0 ${t.switcherOutlineWidth} ${t.borderColorError};
    `;
  },
});
