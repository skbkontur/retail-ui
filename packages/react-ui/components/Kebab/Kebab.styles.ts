import { css, cssName, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  kebab() {
    return css`
      display: inline-block;
      text-align: center;
      border: 2px solid transparent;
      box-sizing: border-box;
      border-radius: 50%;
      user-select: none;
      cursor: pointer;
      outline: 0;
      transition: background 0.12s ease-out;
      width: 26px;
      height: 26px;

      &:hover {
        background: rgba(0, 0, 0, 0.09);
      }
    `;
  },

  focused(t: Theme) {
    return css`
      ${cssName(styles.kebab())}& {
        background: rgba(0, 0, 0, 0.09);
        border-color: ${t.borderColorFocus};
      }
    `;
  },

  opened() {
    return css`
      ${cssName(styles.kebab())}& {
        background: rgba(0, 0, 0, 0.09);
        cursor: default;
      }
    `;
  },

  disabled() {
    return css`
      ${cssName(styles.kebab())}& {
        cursor: default;

        &:hover {
          background: none;
        }
      }
    `;
  },

  iconsmall() {
    return css`
      ${cssName(styles.kebab())} & {
        margin-top: 1px;
        margin-left: 0.8124px;
      }
    `;
  },

  iconmedium() {
    return css`
      ${cssName(styles.kebab())} & {
        margin-top: -2px;
        margin-left: 0.5px;
      }
    `;
  },

  iconlarge() {
    return css`
      ${cssName(styles.kebab())} & {
        margin-top: -4px;
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
