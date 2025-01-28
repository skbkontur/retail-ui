import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      ${resetButton()}
      display: inline-block;
      position: relative;
      border-radius: ${t.closeBtnIconBorderRadius};
      color: ${t.closeBtnIconColor};
      cursor: pointer;
      transition: color ${t.transitionDuration} ${t.transitionTimingFunction};
      background-color: #f8ec58;
      &:enabled:hover {
        color: ${t.closeBtnIconHoverColor};
      }
      &:enabled:not hover {
        color: ${t.closeBtnIconColor};
      }
    `;
  },
  rootDisabled(t: Theme) {
    return css`
      color: ${t.closeBtnIconDisabledColor};
    `;
  },
  focus(t: Theme) {
    return css`
      color: ${t.closeBtnIconHoverColor};
    `;
  },
  wrapper() {
    return css`
      box-sizing: content-box;
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    `;
  },

  cleanCrossSmall(t: Theme) {
    return css`
      width: ${t.cleanCrossIconWidthSmall};
      height: ${t.cleanCrossIconHeightSmall};
      margin-right: ${t.cleanCrossIconRightMarginSmall};
    `;
  },
  cleanCrossMedium(t: Theme) {
    return css`
      width: ${t.cleanCrossIconWidthMedium};
      height: ${t.cleanCrossIconHeightMedium};
      margin-right: ${t.cleanCrossIconRightMarginMedium};
    `;
  },
  cleanCrossLarge(t: Theme) {
    return css`
      width: ${t.cleanCrossIconWidthLarge};
      height: ${t.cleanCrossIconHeightLarge};
      margin-right: ${t.cleanCrossIconRightMarginLarge};
    `;
  },
});
