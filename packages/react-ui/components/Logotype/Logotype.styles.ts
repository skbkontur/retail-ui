import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root(t: Theme) {
    return css`
      font-weight: 400;
      text-decoration: none;
      position: relative;
      bottom: 2px;
      outline: none;
      user-select: none;
      color: ${t.logoColor};

      &:hover {
        color: ${t.logoHoverColor};
      }
    `;
  },

  divider(t: Theme) {
    return css`
      height: 60%;
      margin: 0 0 2px 15px;
      width: 1px;
      background-color: ${t.tdDividerBg};
    `;
  },

  cloud() {
    return css`
      display: inline-block;
      position: relative;
      line-height: 0;
    `;
  },

  inner() {
    return css`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    `;
  },

  dropdown() {
    return css`
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
    `;
  },

  inline() {
    return css`
      ${cssName(styles.dropdown())}& {
        display: inline-flex;
      }
    `;
  },

  widgetWrapper() {
    return css`
      display: flex;
      align-items: center;
    `;
  },

  button() {
    return css`
      display: flex;
      align-items: center;
      margin: 0;
      cursor: pointer;
      outline: 0;
      padding: 0 10px;
      position: relative;
      background: none;
      border: none;

      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.06);
      }
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
