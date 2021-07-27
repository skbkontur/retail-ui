import { css, memoizeStyle } from '../../lib/theming/Emotion';

const scrollSize = 4;
const hoverScrollSize = 10;

const styles = {
  root() {
    return css`
      height: 100%;
      overflow: hidden;
      position: relative;
    `;
  },

  inner() {
    return css`
      position: relative;
      overflow: scroll;
      max-height: 100%;
      max-width: 100%;

      /* IE sometimes enabled scroll */
      margin-bottom: -1px;
      padding-bottom: 1px;
      margin-right: -1px;
      padding-right: 1px;

      /* Hide scrobars without losing functionality */
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    `;
  },

  innerBottomIndent() {
    return css`
      &::after {
        content: '';
        width: 100%;
        display: block;
        height: ${hoverScrollSize + 2}px;
      }
    `;
  },

  scrollBar() {
    return css`
      position: absolute;
      z-index: 200;
      right: 2px;
      transition: width 0.2s;
      width: ${scrollSize}px;

      &::after {
        content: '';
        display: block;
        background: #b7b7b7;
        border-radius: 5px;
        position: absolute;
        bottom: 1px;
        left: 0;
        right: 0;
        top: 1px;
      }
    `;
  },

  scrollBarInvert() {
    return css`
      &::after {
        background: #ccc;
        background: rgba(255, 255, 255, 0.5);
      }
    `;
  },

  scrollBarY() {
    return css`
      right: 2px;
      transition: width 0.2s;
      width: ${scrollSize}px;

      &::after {
        bottom: 1px;
        left: 0;
        right: 0;
        top: 1px;
      }
    `;
  },

  scrollBarYHover() {
    return css`
      width: ${hoverScrollSize}px;
    `;
  },

  scrollBarX() {
    return css`
      bottom: 1px;
      transition: height 0.2s;
      height: ${scrollSize}px;

      &::after {
        bottom: 0px;
        left: 1px;
        right: 1px;
        top: 0;
      }
    `;
  },

  scrollBarXIndentRight() {
    return css`
      &::after {
        right: ${hoverScrollSize + 4}px !important;
      }
    `;
  },

  scrollBarXHover() {
    return css`
      height: ${hoverScrollSize}px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
