import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      cursor: text;

      & ::selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
      & ::-moz-selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
    `;
  },

  selected(t: Theme) {
    return css`
      border-color: ${t.dateInputComponentSelectedBgColor};
      background-color: ${t.dateInputComponentSelectedBgColor};
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
