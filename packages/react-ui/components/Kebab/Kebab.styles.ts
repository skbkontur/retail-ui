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
      background: ${t.kebabBackground};

      &:hover {
        background: ${t.kebabBackgroundHover};
      }

      &:active {
        background: ${t.kebabBackgroundActive};
      }
    `;
  },

  kebabSmall(t: Theme) {
    return css`
      width: ${t.kebabSizeSmall};
      height: ${t.kebabSizeSmall};
    `;
  },

  kebabMedium(t: Theme) {
    return css`
      width: ${t.kebabSizeMedium};
      height: ${t.kebabSizeMedium};
    `;
  },

  kebabLarge(t: Theme) {
    return css`
      width: ${t.kebabSizeLarge};
      height: ${t.kebabSizeLarge};
    `;
  },

  kebab2022() {
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
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
      background: ${t.kebabBackgroundActive} !important; // override kebab:hover style
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

  icon(t: Theme) {
    return css`
      color: ${t.kebabIconColor};
      line-height: 1;
    `;
  },

  iconsmall(t: Theme) {
    return css`
      margin-top: 2px;
      font-size: ${t.kebabIconSizeSmall};
    `;
  },

  iconmedium(t: Theme) {
    return css`
      margin-top: -1px;
      margin-left: 0.5px;
      font-size: ${t.kebabIconSizeMedium};
    `;
  },

  iconlarge(t: Theme) {
    return css`
      margin-top: -2px;
      margin-left: 1px;
      font-size: ${t.kebabIconSizeLarge};
    `;
  },

  menu(t: Theme) {
    return css`
      overflow: hidden;
      border-radius: ${t.popupBorderRadius};
    `;
  },
});
