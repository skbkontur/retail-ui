import { css, injectGlobal, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

import maskCharFontEot from './mask-char-font/font.eot';
import maskCharFontWoff from './mask-char-font/font.woff';
import maskCharFontWoff2 from './mask-char-font/font.woff2';

injectGlobal`
  @font-face {
    font-family: kontur-mask-char;
    src: url('${maskCharFontEot}'); /* For IE11 in IE8 mode. */
    src: url('${maskCharFontEot}?#iefix') format('embedded-opentype'),
    url('${maskCharFontWoff2}') format('woff2'), url('${maskCharFontWoff}') format('woff');
  }
`;

const styles = {
  container() {
    return css`
      position: relative;
      /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
      font-family: kontur-mask-char, Segoe UI, Helevetica Neue; /* IE use Times New Roman as default font */
      font-size: inherit;
      flex: 100% 1 1;
    `;
  },
  inputMask(t: Theme) {
    return css`
      color: ${t.placeholderColor};
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;
      font-size: inherit;
      z-index: 5;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
