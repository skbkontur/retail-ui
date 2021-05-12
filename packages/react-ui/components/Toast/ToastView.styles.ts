import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      background: ${t.toastBg};
      border-radius: ${t.toastBorderRadius};
      border: ${t.toastBorder};
      color: ${t.toastColor};
      display: inline-flex;
      font-size: ${t.toastFontSize};
      line-height: ${t.toastLineHeight};
      opacity: 1;
      padding: ${t.toastPaddingY} ${t.toastPaddingX};
      position: relative;
      top: ${t.toastTop};
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

  closeWrapper(t: Theme) {
    return css`
      display: flex;
      margin: -${t.toastPaddingY} -${t.toastPaddingX} -${t.toastPaddingY} -${t.toastClosePadding};
    `;
  },

  link(t: Theme) {
    const marginRight = `${Math.round(parseInt(t.toastPaddingX) * 1.5)}px`;
    return css`
      color: ${t.toastLinkColor};
      cursor: pointer;
      display: inline-block;
      font-weight: 600;

      margin: -${t.toastPaddingY} ${marginRight} -${t.toastPaddingY} ${t.toastPaddingX};

      padding: ${t.toastPaddingY} 0 ${t.toastPaddingY};

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
      height: ${t.toastCloseSize};
      line-height: 0;
      padding: ${t.toastClosePadding};
      text-align: center;
      width: ${t.toastCloseSize};

      &:hover {
        color: ${t.toastCloseHoverColor};
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
