import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      background: ${t.toastBg};
      border-radius: 2px;
      color: ${t.toastColor};
      display: inline-block;
      font-size: 14px;
      opacity: 1;
      padding: 10px 20px 11px;
      position: relative;
      top: 20px;
    `;
  },

  wrapper() {
    return css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 0;
      text-align: center;
    `;
  },

  closeWrapper() {
    return css`
      display: inline-block;
      position: absolute;
      top: 0;
      bottom: 0;
      line-height: 40px;
    `;
  },

  link(t: Theme) {
    return css`
      color: ${t.toastLinkColor};
      cursor: pointer;
      display: inline-block;
      font-weight: 600;
      margin: -10px 24px -11px 4px;
      padding: 10px 10px 11px;

      &:hover {
        text-decoration: underline;
      }
    `;
  },

  close(t: Theme) {
    return css`
      color: ${t.toastCloseColor};
      cursor: pointer;
      display: inline-block;
      height: 8px;
      line-height: 0;
      margin: -12px -8px;
      padding: 12px 8px;
      text-align: center;
      width: 8px;

      &:hover {
        color: ${t.toastCloseHoverColor};
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
