import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  icon() {
    const space = `'${ZERO_WIDTH_SPACE_CSS}'`;
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
      margin-right: ${t.btnIconGapSmallLeft};
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
      margin-left: ${t.btnIconGapMediumRight};
    `;
  },

  iconLarge(t: Theme) {
    return css`
      width: ${t.btnIconSizeLarge};
    `;
  },

  iconLargeLeft(t: Theme) {
    return css`
      margin-right: ${t.btnIconGapLargeLeft};
    `;
  },

  iconLargeRight(t: Theme) {
    return css`
      margin-left: ${t.btnIconGapLargeRight};
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

  iconNoMargin() {
    return css`
      margin-right: 0;
      margin-left: 0;
    `;
  },
});
