import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
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
      justify-content: center;
      align-items: center;
    `;
  },

  rootDisabled(t: Theme) {
    return css`
      color: ${t.clearCrossIconDisabledColor};
    `;
  },

  focus(t: Theme) {
    return css`
      color: ${t.clearCrossIconHoverColor};
      box-shadow: ${t.clearCrossIconFocusShadow};
    `;
  },

  clearCrossSmall(t: Theme) {
    return css`
      width: ${t.clearCrossIconWidthSmall};
      height: ${t.clearCrossIconHeightSmall};
      margin-right: ${t.clearCrossIconRightMarginSmall};
      border-radius: ${t.clearCrossIconBorderRadiusSmall};
    `;
  },
  clearCrossMedium(t: Theme) {
    return css`
      width: ${t.clearCrossIconWidthMedium};
      height: ${t.clearCrossIconHeightMedium};
      margin-right: ${t.clearCrossIconRightMarginMedium};
      border-radius: ${t.clearCrossIconBorderRadiusMedium};
    `;
  },
  clearCrossLarge(t: Theme) {
    return css`
      width: ${t.clearCrossIconWidthLarge};
      height: ${t.clearCrossIconHeightLarge};
      margin-right: ${t.clearCrossIconRightMarginLarge};
      border-radius: ${t.clearCrossIconBorderRadiusLarge};
    `;
  },
});
