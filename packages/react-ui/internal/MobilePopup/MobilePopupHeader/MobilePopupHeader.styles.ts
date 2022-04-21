import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      position: relative;
      background: ${t.menuBgDefault};
      padding: ${t.mobilePopupHeaderPadding};
      border-radius: ${t.mobilePopupHeaderBorderRadius};
    `;
  },

  withShadow(t: Theme) {
    return css`
      box-shadow: ${t.mobilePopupHeaderShadow};
    `;
  },

  container() {
    return css`
      display: flex;
      flex-direction: column;
    `;
  },

  caption(t: Theme) {
    return css`
      display: flex;
      justify-content: center;
      padding-top: 12px;
      padding-bottom: 12px;
      font-size: ${t.mobilePopupHeaderFontSize};
      line-height: ${t.mobilePopupHeaderLineHeight};
      font-weight: ${t.mobilePopupHeaderFontWeight};
      color: ${t.textColorDefault};
    `;
  },

  childrenWithoutCaption() {
    return css`
      padding-bottom: 8px;
    `;
  },

  closeWrapper() {
    return css`
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
  },

  closeHolder() {
    return css`
      background-color: rgba(0, 0, 0, 0.1);
      height: 4px;
      width: 10%;
      border-radius: 4px;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
