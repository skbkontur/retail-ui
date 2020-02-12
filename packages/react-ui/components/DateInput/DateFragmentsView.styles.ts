import { css, injectGlobal } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import maskCharFontEot from '../internal/MaskedInput/mask-char-font/font.eot';
import maskCharFontWoff from '../internal/MaskedInput/mask-char-font/font.woff';
import maskCharFontWoff2 from '../internal/MaskedInput/mask-char-font/font.woff2';

injectGlobal`
  @font-face {
    font-family: kontur-mask-char;
    src: url('${maskCharFontEot}'); /* For IE11 in IE8 mode. */
    src: url('${maskCharFontEot}?#iefix') format('embedded-opentype'),
    url('${maskCharFontWoff2}') format('woff2'), url('${maskCharFontWoff}') format('woff');
  }
`;

export const jsStyles = {
  root(t: Theme) {
    return css`
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
