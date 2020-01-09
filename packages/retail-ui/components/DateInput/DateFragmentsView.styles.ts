import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';


export const jsStyles = {
  root(t: Theme) {
    return css`
      @font-face {
        font-family: kontur-mask-char;
        src: url('mask-char-font/font.eot'); /* For IE11 in IE8 mode. */
        src: url('mask-char-font/font.eot?#iefix') format('embedded-opentype'),
          url('mask-char-font/font.woff2') format('woff2'), url('mask-char-font/font.woff') format('woff');
      }

      font-family: kontur-mask-char, Segoe UI, Helevetica Neue, sans-serif;
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

  delimiter(t: Theme) {
    return css`
      color: ${t.dateInputMaskColor};
    `;
  },

  delimiterFilled(t: Theme) {
    return css`
      color: inherit;
    `;
  },
};
