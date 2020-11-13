import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
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
      ${cssName(styles.kebab(t))}& {
        background: ${t.kebabBackgroundHover};
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  opened(t: Theme) {
    return css`
      ${cssName(styles.kebab(t))}& {
        background: ${t.kebabBackgroundHover};
        cursor: default;
      }
    `;
  },

  disabled(t: Theme) {
    return css`
      ${cssName(styles.kebab(t))}& {
        cursor: default;

        &:hover {
          background: none;
        }
      }
    `;
  },

  iconsmall(t: Theme) {
    return css`
      ${cssName(styles.kebab(t))} & {
        margin-top: 1px;
        margin-left: 0.8124px;
      }
    `;
  },

  iconmedium(t: Theme) {
    return css`
      ${cssName(styles.kebab(t))} & {
        margin-top: -2px;
        margin-left: 0.5px;
      }
    `;
  },

  iconlarge(t: Theme) {
    return css`
      ${cssName(styles.kebab(t))} & {
        margin-top: -5px;
        margin-left: 0.5px;
      }
    `;
  },

  menu(t: Theme) {
    return css`
      overflow: hidden;
      border-radius: ${t.popupBorderRadius};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
