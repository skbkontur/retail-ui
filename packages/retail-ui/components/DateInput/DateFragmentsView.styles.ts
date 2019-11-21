import ColorFunctions from '../../lib/styles/ColorFunctions';
import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';

const jsStyles = {
  root(t: ITheme) {
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
        background: ${ColorFunctions.fade(t.dateInputComponentSelectedBgColor, 0.99)};
      }
      & ::-moz-selection {
        background: ${t.dateInputComponentSelectedBgColor};
      }
    `;
  },

  selected(t: ITheme) {
    return css`
      border-color: ${ColorFunctions.fade(t.dateInputComponentSelectedBgColor, 0.99)};
      background-color: ${t.dateInputComponentSelectedBgColor};
    `;
  },

  mask(t: ITheme) {
    return css`
      color: ${t.dateInputMaskColor};
    `;
  },

  delimiter(t: ITheme) {
    return css`
      color: ${t.dateInputMaskColor};
    `;
  },

  delimiterFilled(t: ITheme) {
    return css`
      color: inherit;
    `;
  },
};

export default jsStyles;
