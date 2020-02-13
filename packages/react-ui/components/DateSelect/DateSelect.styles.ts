import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      color: ${t.textColorDefault};

      &:hover {
        color: ${t.linkColor};
      }
    `;
  },

  arrow(t: Theme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },

  menuHolder(t: Theme) {
    return css`
      background: ${t.dateSelectMenuBg};
      box-shadow: ${t.popupBoxShadow};
      color: ${t.textColorDefault};
    `;
  },

  menuItem(t: Theme) {
    return css`
      color: ${t.textColorDefault};
    `;
  },

  menuItemSelected(t: Theme) {
    return css`
      background: ${t.dateSelectMenuItemBgSelected};
      color: ${t.dateSelectMenuItemFontSelected};
    `;
  },

  menuItemActive(t: Theme) {
    return css`
      background: ${t.dateSelectMenuItemBgActive};
      color: ${t.dateSelectMenuItemFontActive};
    `;
  },

  menuItemDisabled(t: Theme) {
    return css`
      color: ${t.textColorDisabled};
      background: ${t.dateSelectMenuItemBgDisabled};
    `;
  },

  menuUp(t: Theme) {
    return css`
      background: ${t.dateSelectMenuBg};
      color: ${t.textColorDefault};

      &:hover {
        background: ${t.dateSelectMenuItemBgActive};
        color: ${t.textColorInvert};
      }
    `;
  },

  menuDown(t: Theme) {
    return css`
      background: ${t.dateSelectMenuBg};
      color: ${t.textColorDefault};

      &:hover {
        background: ${t.dateSelectMenuItemBgActive};
        color: ${t.textColorInvert};
      }
    `;
  },
};
