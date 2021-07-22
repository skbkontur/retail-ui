import { css, memoizeStyle } from '../../lib/theming/Emotion';

const scrollSize = 4;
const hoverScrollSize = 10;

const scrollbarWrapperStyle = css`
  position: absolute;
  z-index: 200;
`;

const scrollbarStyle = css`
  content: '';
  display: block;
  background: #b7b7b7;
  border-radius: 5px;
  position: absolute;
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
      position: relative;
      overflow: scroll;
      max-height: 100%;
      max-width: 100%;

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
        height: ${hoverScrollSize + 2}px;
        position: absolute;
      }
    `;
  },

  scrollY() {
    return css`
      ${scrollbarWrapperStyle}
      right: 2px;
      transition: width 0.2s;
      width: ${scrollSize}px;

      &::after {
        ${scrollbarStyle}
        bottom: 1px;
        left: 0;
        right: 0;
        top: 1px;
      }
    `;
  },

  scrollYHover() {
    return css`
      width: ${hoverScrollSize}px;
    `;
  },

  scrollX() {
    return css`
      bottom: 1px;
      transition: height 0.2s;
      height: ${scrollSize}px;
      ${scrollbarWrapperStyle}

      &::after {
        ${scrollbarStyle}
        bottom: 0px;
        left: 1px;
        right: 1px;
        top: 0;
      }
    `;
  },

  scrollXIndentRight() {
    return css`
      &::after {
        right: ${hoverScrollSize + 4}px;
      }
    `;
  },

  scrollXHover() {
    return css`
      height: ${hoverScrollSize}px;
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
