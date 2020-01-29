import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  popup(t: Theme) {
    return css`
      border-radius: ${t.popupBorderRadius};
      border: ${t.popupBorder} ${t.popupBorderColor};
    `;
  },

  content(t: Theme) {
    return css`
      border-radius: ${t.popupBorderRadius};
    `;
  },

  contentInner(t: Theme) {
    return css`
      color: ${t.popupTextColor};
      background: ${t.popupBackground};
    `;
  },

  shadow(t: Theme) {
    return css`
      filter: ${t.popupDropShadow};
      -webkit-filter: ${t.popupDropShadow};
    `;
  },

  shadowFallback(t: Theme) {
    return css`
      box-shadow: ${t.popupBoxShadow};
    `;
  },
};
