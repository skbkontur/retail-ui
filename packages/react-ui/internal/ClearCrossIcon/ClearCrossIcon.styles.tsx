import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${resetButton()}
      color: ${t.clearCrossIconColor};
      cursor: pointer;
      transition: color ${t.transitionDuration} ${t.transitionTimingFunction};
      &:hover {
        color: ${t.clearCrossIconHoverColor};
      }
      display: flex;
      justify-content: ${t.clearCrossIconAlign};
      align-items: center;
      position: absolute;
      right: -${t.inputBorderWidth};
      top: -${t.inputBorderWidth};
    `;
  },

  focus(t: Theme) {
    return css`
      color: ${t.clearCrossIconHoverColor};
    `;
  },

  clearCrossSmall(t: Theme) {
    return css`
      width: ${t.clearCrossIconWidthSmall};
      height: ${t.clearCrossIconHeightSmall};
      border-radius: ${t.clearCrossIconBorderRadiusSmall};
    `;
  },
  clearCrossMedium(t: Theme) {
    return css`
      width: ${t.clearCrossIconWidthMedium};
      height: ${t.clearCrossIconHeightMedium};
      border-radius: ${t.clearCrossIconBorderRadiusMedium};
    `;
  },
  clearCrossLarge(t: Theme) {
    return css`
      width: ${t.clearCrossIconWidthLarge};
      height: ${t.clearCrossIconHeightLarge};
      border-radius: ${t.clearCrossIconBorderRadiusLarge};
    `;
  },
  relativeWidthSmall(t: Theme) {
    return css`
      display: inline-block;
      width: ${t.inputIconSizeSmall};
    `;
  },
  relativeWidthMedium(t: Theme) {
    return css`
      display: inline-block;
      width: ${t.inputIconSizeMedium};
    `;
  },
  relativeWidthLarge(t: Theme) {
    return css`
      display: inline-block;
      width: ${t.inputIconSizeLarge};
    `;
  },
});
