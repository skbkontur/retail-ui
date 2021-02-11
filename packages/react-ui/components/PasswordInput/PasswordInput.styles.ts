import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  root() {
    return css`
      position: relative;
      display: inline-block;

      input::-ms-clear,
      input::-ms-reveal {
        display: none;
      }
    `;
  },
  toggleVisibility() {
    return css`
      color: #000;
      cursor: pointer;
      opacity: 0.6;
      user-select: none;

      &:hover {
        opacity: 1;
      }
    `;
  },
  capsLockDetector() {
    return css`
      display: inline-block;
      font-size: 9px;
      margin-right: 8px;
      color: #fff;
      cursor: default;
      background: #999;
      padding: 2px 5px;
      border-radius: 3px;
      z-index: 9;
      box-sizing: border-box;
      line-height: normal;

      &::before {
        content: 'CapsLock';
      }
    `;
  },
  iconWrapper() {
    return css`
      display: flex;
      align-items: center;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
