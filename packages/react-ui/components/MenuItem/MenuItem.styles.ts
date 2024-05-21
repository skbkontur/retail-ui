import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';
import { memoizeStyle } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

import { iconSizeMixin, menuItemSizeMixin, withIconSizeMixin } from './MenuItem.mixins';

export const getMenuItemPaddings = ({
  menuItemLegacyPaddingX,
  menuItemPaddingX,
  menuItemLegacyPaddingY,
  menuItemPaddingY,
}: Record<'menuItemLegacyPaddingX' | 'menuItemPaddingX' | 'menuItemLegacyPaddingY' | 'menuItemPaddingY', string>) => {
  const legacyPaddingX = parseFloat(menuItemLegacyPaddingX);
  const legacyPaddingY = parseFloat(menuItemLegacyPaddingY);

  const paddingX = legacyPaddingX !== 0 ? `${parseFloat(menuItemPaddingX) + legacyPaddingX}px` : menuItemPaddingX;
  const paddingY = legacyPaddingY !== 0 ? `${parseFloat(menuItemPaddingY) + legacyPaddingY}px` : menuItemPaddingY;

  return { paddingX, paddingY };
};

export const getStyles = (emotion: Emotion) => {
  return memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        ${resetButton(emotion)};

        cursor: pointer;
        display: ${t.menuItemDisplay};
        position: relative;
        text-decoration: none;
        color: ${t.menuItemTextColor};
        border-radius: ${t.menuItemBorderRadius};

        button& {
          min-width: 100%;
        }

        &:nth-last-of-type(n + 2) {
          margin-bottom: ${t.menuItemGap};
        }
      `;
    },

    rootSmall(t: Theme) {
      return emotion.css`
        ${menuItemSizeMixin(emotion)(
          t.menuItemLegacyPaddingX,
          t.menuItemPaddingXSmall,
          t.menuItemLegacyPaddingY,
          t.menuItemPaddingYSmall,
          t.menuItemLineHeightSmall,
          t.menuItemFontSizeSmall,
        )};
      `;
    },
    rootMedium(t: Theme) {
      return emotion.css`
        ${menuItemSizeMixin(emotion)(
          t.menuItemLegacyPaddingX,
          t.menuItemPaddingXMedium,
          t.menuItemLegacyPaddingY,
          t.menuItemPaddingYMedium,
          t.menuItemLineHeightMedium,
          t.menuItemFontSizeMedium,
        )};
      `;
    },
    rootLarge(t: Theme) {
      return emotion.css`
        ${menuItemSizeMixin(emotion)(
          t.menuItemLegacyPaddingX,
          t.menuItemPaddingXLarge,
          t.menuItemLegacyPaddingY,
          t.menuItemPaddingYLarge,
          t.menuItemLineHeightLarge,
          t.menuItemFontSizeLarge,
        )};
      `;
    },

    rootMobile(t: Theme) {
      return emotion.css`
        font-size: ${t.menuItemFontSizeMobile};
        line-height: ${t.menuItemLineHeightMobile};
        padding: ${t.menuItemPaddingMobile};
      `;
    },

    hover(t: Theme) {
      // Color with !important in purpose to override `a:hover`
      return emotion.css`
        background: ${t.menuItemHoverBg} !important;
        color: ${t.menuItemHoverColor} !important;
      `;
    },
    selected(t: Theme) {
      return emotion.css`
        background: ${t.menuItemSelectedBg} !important;
      `;
    },
    disabled(t: Theme) {
      return emotion.css`
        background: ${t.menuItemDisabledBg};
        color: ${t.menuItemDisabledColor};
        cursor: default;
      `;
    },
    link(t: Theme) {
      return emotion.css`
        color: ${t.menuItemLinkColor};
      `;
    },
    loose() {
      return emotion.css`
        padding-left: 15px;
      `;
    },
    withIconSmall(t: Theme) {
      return emotion.css`
        ${withIconSizeMixin(emotion)(t.menuItemPaddingForIconSmall)}
      `;
    },
    withIconMedium(t: Theme) {
      return emotion.css`
        ${withIconSizeMixin(emotion)(t.menuItemPaddingForIconMedium)}
      `;
    },
    withIconLarge(t: Theme) {
      return emotion.css`
        ${withIconSizeMixin(emotion)(t.menuItemPaddingForIconLarge)}
      `;
    },
    comment(t: Theme) {
      return emotion.css`
        color: ${t.menuItemCommentColor};
        opacity: ${t.menuItemCommentOpacity};
        white-space: normal;
        padding-top: 4px;
      `;
    },
    commentHover(t: Theme) {
      return emotion.css`
        color: ${t.menuItemCommentColorHover};
        opacity: 0.6;
      `;
    },
    icon(t: Theme) {
      return emotion.css`
        display: inline-block;
        position: absolute;
        transform: translateY(${t.menuItemIconLegacyShift});
      `;
    },
    iconSmall(t: Theme) {
      return emotion.css`
        ${iconSizeMixin(emotion)(t.menuItemIconWidthSmall, t.menuItemPaddingXSmall, t.menuItemIconLegacyMargin)};
      `;
    },
    iconMedium(t: Theme) {
      return emotion.css`
        ${iconSizeMixin(emotion)(t.menuItemIconWidthMedium, t.menuItemPaddingXMedium, t.menuItemIconLegacyMargin)};
      `;
    },
    iconLarge(t: Theme) {
      return emotion.css`
        ${iconSizeMixin(emotion)(t.menuItemIconWidthLarge, t.menuItemPaddingXLarge, t.menuItemIconLegacyMargin)};
      `;
    },
    mobileContentWithIcon() {
      return emotion.css`
        margin-left: 8px;
      `;
    },
  });
};
