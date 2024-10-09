import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('select')({
  arrow: 'arrow',
});

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        color: ${t.dateSelectTextColorDefault};
        cursor: pointer;
        display: inline-block;
        font: inherit;
        font-size: ${t.dateSelectFontSize};
        padding: 0px;
        padding-right: 2px;
        position: relative;
        text-align: left;
        touch-action: none;
        border: none;
        line-height: ${t.dateSelectLineHeight};
        background-color: transparent;
        box-sizing: content-box;

        &:hover {
          color: ${t.dateSelectLinkColor};
        }

        & .${globalClasses.arrow} {
          transition: fill ${t.transitionDuration} ${t.transitionTimingFunction};
        }

        &:hover .${globalClasses.arrow} {
          fill: ${t.dateSelectTextColorDefault} !important;
        }
      `;
    },

    root2022() {
      return emotion.css`
        display: inline-flex;
        justify-content: space-between;
      `;
    },

    disabled() {
      return emotion.css`
        color: inherit !important; // override root:hover style
        cursor: default;
      `;
    },

    caption() {
      return emotion.css`
        position: relative;
      `;
    },

    arrow(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        opacity: 0;
      `;
    },

    menuHolder(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        margin-top: 0;
        padding-top: 5px;
      `;
    },

    isBotCapped() {
      return emotion.css`
        padding-bottom: 5px;
      `;
    },

    itemsHolder() {
      return emotion.css`
        overflow: hidden;
        position: relative;
      `;
    },

    menuItem(t: Theme) {
      return emotion.css`
        display: flex;
        color: ${t.dateSelectTextColorDefault};
        cursor: pointer;
        height: 24px;
        padding: 0;
        padding-left: 10px;
        width: 100%;
        user-select: none;
        white-space: nowrap;
        touch-action: none;
        border: none;
        font: inherit;
        line-height: 24px;
        background-color: transparent;
      `;
    },

    menuItemSelected(t: Theme) {
      return emotion.css`
        background: ${t.dateSelectMenuItemBgSelected};
        color: ${t.dateSelectMenuItemFontSelected};
      `;
    },

    menuItemActive(t: Theme) {
      return emotion.css`
        background: ${t.dateSelectMenuItemBgActive};
        color: ${t.dateSelectMenuItemFontActive};
      `;
    },

    menuItemDisabled(t: Theme) {
      return emotion.css`
        background: ${t.dateSelectMenuItemBgDisabled};
        color: ${t.dateSelectTextColorDisabled};
        pointer-events: none;
      `;
    },

    menu(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        span {
          position: relative;
          top: -0.5px;
        }
      `;
    },

    menuDown() {
      return emotion.css`
        span {
          position: relative;
          top: -1px;
        }
      `;
    },

    nativeSelect() {
      return emotion.css`
      position: absolute;
      top: -12px;
      right: 0;
      bottom: -8px;
      left: 0;
      cursor: pointer;
      appearance: none;
      opacity: 0;
      border: none;
    `;
    },
  });
