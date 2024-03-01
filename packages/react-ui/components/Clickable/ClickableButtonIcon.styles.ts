import { ZERO_WIDTH_SPACE_CSS } from '../../lib/chars';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import { ClickableProps } from './Clickable';
import { ClickableButtonIconProps } from './ClickableButtonIcon';

export const buttonIconStyles = memoizeStyle({
  icon() {
    return css`
      display: 'inline-flex';
      alignitems: 'center';

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

interface GetButtonIconSizeClassNameArgs
  extends Pick<ClickableProps, 'size'>,
    Pick<ClickableButtonIconProps, 'position'> {
  theme: Theme;
}

export const getButtonIconSizeClassName = ({ size, position, theme }: GetButtonIconSizeClassNameArgs) => {
  if (size === 'large') {
    return [
      buttonIconStyles.iconLarge(theme),
      position === 'left' ? buttonIconStyles.iconLargeLeft(theme) : buttonIconStyles.iconLargeRight(theme),
    ];
  }

  if (size === 'medium') {
    return [
      buttonIconStyles.iconMedium(theme),
      position === 'left' ? buttonIconStyles.iconMediumLeft(theme) : buttonIconStyles.iconMediumRight(theme),
    ];
  }

  return [
    buttonIconStyles.iconSmall(theme),
    position === 'left' ? buttonIconStyles.iconSmallLeft(theme) : buttonIconStyles.iconSmallRight(theme),
  ];
};
