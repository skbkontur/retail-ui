import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css`
      display: inline-block;
      position: relative;
      line-height: normal;
    `;
  },

  spinnerWrapper() {
    return css`
      display: inline-block;
      margin-right: -5px;
    `;
  },

  rightIconWrapper() {
    return css`
      display: inline-block;
      margin-right: -3px;
    `;
  },

  notFoundFontSizeSmall(t: Theme) {
    return css`
      font-size: ${t.comboboxFontSizeSmall};
      line-height: ${t.comboboxLineHeightSmall};
    `;
  },
  notFoundFontSizeMedium(t: Theme) {
    return css`
      font-size: ${t.comboboxFontSizeMedium};
      line-height: ${t.comboboxLineHeightMedium};
    `;
  },
  notFoundFontSizeLarge(t: Theme) {
    return css`
      font-size: ${t.comboboxFontSizeLarge};
      line-height: ${t.comboboxLineHeightLarge};
    `;
  },
});
