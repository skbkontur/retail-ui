import { css, memoizeStyle } from '../../lib/theming/Emotion';

const customScroll = css`
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
      margin-bottom: -1px;
      max-height: 100%;

      /* IE sometimes enabled scroll: http://codepen.io/anon/pen/RRrLNX */
      padding-bottom: 1px;
      overflow-y: scroll;
    `;
  },

  scroll() {
    return css`
      position: absolute;
      right: 2px;
      transition: width 0.2s;
      width: 4px;
      z-index: 200;

      ${customScroll}
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
      bottom: 2px;
      transition: height 0.2s;
      height: 6px;
      z-index: 200;

      ${customScroll}
    `;
  },

  scrollXHover() {
    return css`
      height: 12px;
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
