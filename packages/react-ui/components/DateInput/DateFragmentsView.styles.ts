import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css`
      cursor: text;
    `;
  },

  selected(t: Theme) {
    return css`
      & ::selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
      & ::-moz-selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
    `;
  },

  selectedFor22Themes(t: Theme) {
    const getSelection = (background: string, color: string) =>
      (background || color) &&
      `& ::selection {
      background: ${background};
      color: ${color};
    }`;

    return css`
      cursor: text;

      ${getSelection(t.dateInputComponentSelectedBgColor, t.dateInputComponentSelectedTextColor)}
    `;
  },

  mask(t: Theme) {
    return css`
      color: ${t.dateInputMaskColor};
    `;
  },

  delimiterFilled() {
    return css`
      color: inherit;
    `;
  },
});
