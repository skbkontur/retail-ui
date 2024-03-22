import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const buttonWrapperStyles = memoizeStyle({
  buttonWrapper(t: Theme) {
    return css`
      box-sizing: border-box;
      display: inline-block;
      line-height: normal;
      padding: ${t.btnBorderWidth};
    `;
  },
  buttonWrapperSmall(t: Theme) {
    return css`
      height: ${t.btnHeightSmall};
    `;
  },
  buttonWrapperMedium(t: Theme) {
    return css`
      height: ${t.btnHeightMedium};
    `;
  },
  buttonWrapperLarge(t: Theme) {
    return css`
      height: ${t.btnHeightLarge};
    `;
  },
});
