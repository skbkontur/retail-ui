import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      color: ${t.textColorDefault};
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      line-height: 24px;
      outline: 0;
      padding-right: 2px;
      position: relative;
      text-align: left;

      &:hover {
        color: ${t.linkColor};
      }
    `;
  },

  disabled() {
    return css`
      color: inherit;
      cursor: default;
    `;
  },

  caption() {
    return css`
      position: relative;
    `;
  },

  arrow(t: Theme) {
    return css`
      color: ${t.textColorDisabled};
      float: right;
      line-height: 24px;
      opacity: 1;
      position: absolute;
      right: 4px;
      top: 0;
      transform: scaleX(0.7);
      transition: opacity 0.2s ease-out;
    `;
  },
  arrowDisabled() {
    return css`
      opacity: 0;
    `;
  },

  menuHolder(t: Theme) {
    return css`
      background: ${t.dateSelectMenuBg};
      box-shadow: ${t.popupBoxShadow};
      box-sizing: content-box;
      color: ${t.textColorDefault};
      font-size: 14px;
      margin-top: -11px;
      overflow: hidden;
      position: absolute;
      z-index: 1000;
    `;
  },

  isTopCapped() {
    return css`
      margin-top: 0;
      padding-top: 5px;
    `;
  },

  isBotCapped() {
    return css`
      padding-bottom: 5px;
    `;
  },

  itemsHolder() {
    return css`
      overflow: hidden;
      position: relative;
    `;
  },

  menuItem(t: Theme) {
    return css`
      color: ${t.textColorDefault};
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      padding-left: 10px;
      user-select: none;
      white-space: nowrap;
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
      background: ${t.dateSelectMenuItemBgDisabled};
      color: ${t.textColorDisabled};
      pointer-events: none;
    `;
  },

  menu(t: Theme) {
    return css`
      box-sizing: border-box;
      cursor: pointer;
      height: 16px;
      line-height: 0;
      padding-left: 18px;
      text-align: left;
      user-select: none;

      background: ${t.dateSelectMenuBg};
      color: ${t.textColorDefault};

      &:hover {
        background: ${t.dateSelectMenuItemBgActive};
        color: ${t.textColorInvert};
      }
    `;
  },

  menuUp(t: Theme) {
    return css`
      ${styles.menu(t)}

      span {
        position: relative;
        top: -0.5px;
      }
    `;
  },

  menuDown(t: Theme) {
    return css`
      ${styles.menu(t)}

      span {
        position: relative;
        top: -1px;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
