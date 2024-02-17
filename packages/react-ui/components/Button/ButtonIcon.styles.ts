import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  icon(t: Theme) {
    const space = isTheme2022(t) ? `'${ZERO_WIDTH_SPACE_CSS}'` : null;
    return css`
      display: inline-block;

      &::before {
        content: ${space};
      }
    `;
  },

  iconSmall(t: Theme) {
    return css`
      width: ${t.btnIconSizeSmall};
    `;
  },

  iconSmallLeft(t: Theme) {
    return css`
      margin-right: ${t.btnIconGapSmall};
    `;
  },

  iconSmallRight(t: Theme) {
    return css`
      margin-left: ${t.btnIconGapSmallRight};
    `;
  },

  iconMedium(t: Theme) {
    return css`
      width: ${t.btnIconSizeMedium};
    `;
  },

  iconMediumLeft(t: Theme) {
    return css`
      margin-right: ${t.btnIconGapMediumRight};
    `;
  },

  iconMediumRight(t: Theme) {
    return css`
      margin-left: ${t.btnIconGapMedium};
    `;
  },

  iconLarge(t: Theme) {
    return css`
      width: ${t.btnIconSizeLarge};
    `;
  },

  iconLargeLeft(t: Theme) {
    return css`
      margin-right: ${t.btnIconGapLarge};
    `;
  },

  iconLargeRight(t: Theme) {
    return css`
      margin-left: ${t.btnIconGapLargeRight};
    `;
  },

  iconNoMargin() {
    return css`
      margin-right: 0;
      margin-left: 0;
    `;
  },

  iconLeftLink(t: Theme) {
    return css`
      margin-right: ${t.btnLinkIconMarginRight};
    `;
  },

  iconRightLink(t: Theme) {
    return css`
      margin-left: ${t.btnLinkIconMarginLeft};
    `;
  },
});
