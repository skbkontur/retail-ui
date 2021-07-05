import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { resetButton } from '../../lib/styles/Mixins';

const styles = {
  root(t: Theme) {
    return css`
      position: relative;
      background: ${t.menuBgDefault};
      padding: 12px 16px 24px;
      border-radius: 8px 8px 0px 0px;
      box-shadow: 0px 0px 16px 1px rgba(0, 0, 0, 0.1);
    `;
  },

  container() {
    return css`
      position: relative;
      overflow-wrap: break-word;
      word-wrap: break-word;
    `;
  },

  caption() {
    return css`
      font-size: 18px;
      line-height: 28px;
    `;
  },

  closeWrapper() {
    return css`
      position: relative;
      float: right;
      width: 12px;
      height: 12px;
      padding: 8px 0;
      padding-left: 17px;
    `;
  },

  close(t: Theme) {
    return css`
      ${resetButton()};
      display: flex;
      background: none;
      background: transparent;
      cursor: pointer;
      color: ${t.modalCloseButtonColor};
      text-align: center;
      vertical-align: middle;
      padding: 10px !important;
      margin: -10px !important;

      & > svg {
        width: 12px;
        height: 12px;
        box-sizing: content-box;
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
