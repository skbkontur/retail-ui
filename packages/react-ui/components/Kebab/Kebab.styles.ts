import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  kebab(t: Theme) {
    return css`
      display: inline-block;
      text-align: center;
      border: ${t.kebabBorder};
      box-sizing: border-box;
      border-radius: ${t.kebabBorderRadius};
      user-select: none;
      cursor: pointer;
      outline: 0;
      transition: background 0.12s ease-out;
      width: 26px;
      height: 26px;
      background: ${t.kebabBackground};

      &:hover {
        background: ${t.kebabBackgroundHover};
      }
    `;
  },

  focused(t: Theme) {
    return css`
      background: ${t.kebabBackgroundHover};
      border-color: ${t.borderColorFocus};
    `;
  },

  opened(t: Theme) {
    return css`
      background: ${t.kebabBackgroundHover} !important; // override kebab:hover style
      cursor: default;
    `;
  },

  disabled() {
    return css`
      cursor: default;

      &:hover {
        background: none;
      }
    `;
  },

  icon() {
    return css`
      color: #757575;
      line-height: 1;
    `;
  },

  iconsmall() {
    return css`
      margin-top: 2px;
      font-size: 14px;
    `;
  },

  iconmedium() {
    return css`
      margin-top: -1px;
      margin-left: 0.5px;
      font-size: 18px;
    `;
  },

  iconlarge() {
    return css`
      margin-top: -2px;
      margin-left: 1px;
      font-size: 20px;
    `;
  },

  menu(t: Theme) {
    return css`
      overflow: hidden;
      border-radius: ${t.popupBorderRadius};
    `;
  },
});
