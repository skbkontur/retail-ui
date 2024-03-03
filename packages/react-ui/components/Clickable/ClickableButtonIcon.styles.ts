import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { ClickableProps } from './Clickable';
import { ClickableButtonIconProps } from './ClickableButtonIcon';

export const buttonIconStyles = memoizeStyle({
  icon() {
    return css`
      display: inline-flex;
      align-items: center;

      &::before {
        content: '${ZERO_WIDTH_SPACE_CSS}';
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
});

export const getButtonIconSizeClassName = (
  size: ClickableProps['size'],
  position: ClickableButtonIconProps['position'],
  theme: Theme,
) => {
  if (size === 'large') {
    return {
      [buttonIconStyles.iconLarge(theme)]: true,
      [buttonIconStyles.iconLargeLeft(theme)]: position === 'left',
      [buttonIconStyles.iconLargeRight(theme)]: position === 'right',
    };
  }

  if (size === 'medium') {
    return {
      [buttonIconStyles.iconMedium(theme)]: true,
      [buttonIconStyles.iconMediumLeft(theme)]: position === 'left',
      [buttonIconStyles.iconMediumRight(theme)]: position === 'right',
    };
  }

  return {
    [buttonIconStyles.iconSmall(theme)]: true,
    [buttonIconStyles.iconSmallLeft(theme)]: position === 'left',
    [buttonIconStyles.iconSmallRight(theme)]: position === 'right',
  };
};
