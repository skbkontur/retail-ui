import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
    return css`
      color: ${t.textColorDefault};

      &:hover {
        color: ${t.linkColor};
      }
    `;
  },

  arrow(t: ITheme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },

  menuHolder(t: ITheme) {
    return css`
      background: ${t.dateSelectMenuBg};
      box-shadow: ${t.popupBoxShadow};
      color: ${t.textColorDefault};
    `;
  },

  menuItem(t: ITheme) {
    return css`
      color: ${t.textColorDefault};
    `;
  },

  menuItemSelected(t: ITheme) {
    return css`
      background: ${t.dateSelectMenuItemBgSelected};
      color: ${t.dateSelectMenuItemFontSelected};
    `;
  },

  menuItemActive(t: ITheme) {
    return css`
      background: ${t.dateSelectMenuItemBgActive};
      color: ${t.dateSelectMenuItemFontActive};
    `;
  },

  menuItemDisabled(t: ITheme) {
    return css`
      color: ${t.textColorDisabled};
      background: ${t.dateSelectMenuItemBgDisabled};
    `;
  },

  menuUp(t: ITheme) {
    return css`
      background: ${t.dateSelectMenuBg};
      color: ${t.textColorDefault};

      &:hover {
        background: ${t.dateSelectMenuItemBgActive};
        color: ${t.textColorInvert};
      }
    `;
  },

  menuDown(t: ITheme) {
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

export default jsStyles;
