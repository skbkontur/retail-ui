import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${resetButton()}
      color: ${t.cleanCrossIconColor};
      cursor: pointer;
      transition: color ${t.transitionDuration} ${t.transitionTimingFunction};
      &:hover {
        color: ${t.cleanCrossIconHoverColor};
      }
      display: flex;
      justify-content: center;
      align-items: center;
    `;
  },

  rootDisabled(t: Theme) {
    return css`
      color: ${t.cleanCrossIconDisabledColor};
    `;
  },

  focus(t: Theme) {
    return css`
      color: ${t.cleanCrossIconHoverColor};
      box-shadow: ${t.cleanCrossIconFocusShadow};
    `;
  },

  cleanCrossSmall(t: Theme) {
    return css`
      width: ${t.cleanCrossIconWidthSmall};
      height: ${t.cleanCrossIconHeightSmall};
      margin-right: ${t.cleanCrossIconRightMarginSmall};
      border-radius: ${t.cleanCrossIconBorderRadiusSmall};
    `;
  },
  cleanCrossMedium(t: Theme) {
    return css`
      width: ${t.cleanCrossIconWidthMedium};
      height: ${t.cleanCrossIconHeightMedium};
      margin-right: ${t.cleanCrossIconRightMarginMedium};
      border-radius: ${t.cleanCrossIconBorderRadiusMedium};
    `;
  },
  cleanCrossLarge(t: Theme) {
    return css`
      width: ${t.cleanCrossIconWidthLarge};
      height: ${t.cleanCrossIconHeightLarge};
      margin-right: ${t.cleanCrossIconRightMarginLarge};
      border-radius: ${t.cleanCrossIconBorderRadiusLarge};
    `;
  },
});
