import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root() {
    return css`
      cursor: text;
    `;
  },

  selected(t: Theme) {
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
