import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      color: ${t.dateSelectTextColorDefault};
      cursor: pointer;
      display: inline-block;
      font-size: ${t.dateSelectFontSize};
      line-height: ${t.dateSelectLineHeight};
      outline: 0;
      padding-right: 2px;
      position: relative;
      text-align: left;

      &:hover {
        color: ${t.dateSelectLinkColor};
      }
    `;
  },

  disabled() {
    return css`
      color: inherit !important; // override root:hover style
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
      color: ${t.dateSelectTextColorDisabled};
      float: right;
      line-height: ${t.dateSelectLineHeight};
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
      box-shadow: ${t.dateSelectPopupBoxShadow};
      box-sizing: content-box;
      color: ${t.dateSelectTextColorDefault};
      font-size: ${t.dateSelectFontSize};
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
      color: ${t.dateSelectTextColorDefault};
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
      color: ${t.dateSelectTextColorDisabled};
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
      color: ${t.dateSelectTextColorDefault};

      &:hover {
        background: ${t.dateSelectMenuItemBgActive};
        color: ${t.dateSelectTextColorInvert};
      }
    `;
  },

  menuUp() {
    return css`
      span {
        position: relative;
        top: -0.5px;
      }
    `;
  },

  menuDown() {
    return css`
      span {
        position: relative;
        top: -1px;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
