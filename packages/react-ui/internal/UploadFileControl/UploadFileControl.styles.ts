import { css, keyframes, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  pulse() {
    return keyframes`
        0% {
          box-shadow:
            0px 0px 0px 0px #2DA4F9,
            0px 0px 0px 1px rgba(45,164,249,0.7);
        }
        95% {
          box-shadow:
            0px 0px 0px 0px #2DA4F9,
            0px 0px 0px 10px rgba(45,164,249,0);
        }
        100% {
          box-shadow:
            0px 0px 0px 0px #2DA4F9,
            0px 0px 0px 1px rgba(45,164,249,0);
        }
      `;
  },

  uploadButton() {
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      border: 1px dashed rgba(0, 0, 0, 0.37);
      box-sizing: padding-box;
      border-radius: 1px;
      outline: none;
      height: 32px;
      width: 362px;
      cursor: pointer;
      padding: 0 12px 0 7px;
      transition: box-shadow 0.3s ease;

      &:focus {
        border: 1px solid #1d85d0;
        box-shadow: 0px 0px 0px 1px #1d85d0;
      }
    `;
  },

  dragOver() {
    return css`
      border: 1px solid #2da4f9;
      border-radius: 2px;
      box-shadow: 0px 0px 0px 3px #2da4f9, 0px 0px 0px 8px rgba(45, 164, 249, 0.35);
    `;
  },

  windowDragOver() {
    return css`
      animation: ${styles.pulse()} 1.5s infinite;
    `;
  },

  content() {
    return css`
      display: flex;
      width: 100%;
      align-items: center;
      height: 100%;
    `;
  },

  fileInput() {
    return css`
      display: none;
    `;
  },

  afterLinkText() {
    return css`
      display: flex;
      justify-content: space-between;
      flex: 1 1 auto;
    `;
  },

  error() {
    return css`
      border: 1px solid #d70c17 !important;
      box-shadow: 0px 0px 0px 1px #d70c17 !important;
    `;
  },

  disabled() {
    return css`
      cursor: default;
      background: #f2f2f2;
      border: 1px solid #f2f2f2;
      color: #808080;

      &:focus {
        border: 1px solid #f2f2f2 !important;
        box-shadow: none;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
