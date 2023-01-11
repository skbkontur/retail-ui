import { resetButton } from '../../lib/styles/Mixins';
import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { getMenuItemPaddings } from '../../components/MenuItem/MenuItem.styles';

export const styles = memoizeStyle({
  root(t: Theme) {
    const { paddingX, paddingY } = getMenuItemPaddings({
      menuItemLegacyPaddingX: t.menuItemLegacyPaddingX,
      menuItemPaddingX: t.menuMessagePaddingX,
      menuItemLegacyPaddingY: t.menuItemLegacyPaddingY,
      menuItemPaddingY: t.menuMessagePaddingY,
    });

    return css`
      ${resetButton()};

      cursor: ${t.menuMessageCursor};
      display: ${t.menuMessageDisplay};
      line-height: ${t.menuMessageLineHeight};
      font-size: ${t.menuMessageFontSize};
      padding: ${t.menuMessagePaddingY} ${paddingX} ${paddingY} ${t.menuMessagePaddingX};
      color: ${t.menuMessageTextColor};
      background: ${t.menuMessageBg};
    `;
  },

  rootMobile(t: Theme) {
    return css`
      font-size: ${t.menuMessageFontSizeMobile};
      line-height: ${t.menuMessageLineHeightMobile};
      padding: ${t.menuMessagePaddingMobile};
    `;
  },
});
