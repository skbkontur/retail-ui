import { css, memoizeStyle } from '../../lib/theming/Emotion';

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
      /* IE sometimes enabled scroll: http://codepen.io/anon/pen/RRrLNX */
      padding-bottom: 1px;
      overflow: scroll;
    `;
  },

  bottomIndent() {
    return css`
      &::after {
        content: '';
        width: 100%;
        height: 12px;
        position: absolute;
      }
    `;
  },

  scroll() {
    return css`
      position: absolute;
      right: 2px;
      transition: width 0.2s;
      width: 4px;
      z-index: 200;

      &::after {
        background: #b7b7b7;
        border-radius: 5px;
        bottom: 1px;
        content: '';
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: 1px;
      }
    `;
  },

  scrollHover() {
    return css`
      width: 10px;
    `;
  },

  scrollX() {
    return css`
      position: absolute;
      bottom: 1px;
      transition: height 0.2s;
      height: 4px;
      z-index: 200;

      &::after {
        background: #b7b7b7;
        border-radius: 5px;
        bottom: 0px;
        content: '';
        display: block;
        left: 1px;
        position: absolute;
        right: 6px;
        top: 0;
      }
    `;
  },

  scrollXHover() {
    return css`
      height: 10px;
    `;
  },

  scrollInvert() {
    return css`
      &::after {
        background: #ccc;
        background: rgba(255, 255, 255, 0.5);
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
