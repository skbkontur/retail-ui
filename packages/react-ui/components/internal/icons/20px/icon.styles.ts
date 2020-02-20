import { css, injectGlobal, memoizeStyle } from '../../../../lib/theming/Emotion';

import KonturIconicEco20pxEot from './Kontur-Iconic-eco-20px.eot';
import KonturIconicEco20pxWoff from './Kontur-Iconic-eco-20px.woff';
import KonturIconicEco20pxWoff2 from './Kontur-Iconic-eco-20px.woff2';

injectGlobal`
  @font-face {
    font-family: kontur-iconic-20px;
    src: url('${KonturIconicEco20pxEot}'); /* For IE11 in IE8 mode. */
    src: url('${KonturIconicEco20pxEot}?#iefix') format('embedded-opentype'),
      url('${KonturIconicEco20pxWoff2}') format('woff2'), url('${KonturIconicEco20pxWoff}') format('woff');
  }
`;

const styles = {
  root() {
    return css`
      font-family: kontur-iconic-20px;
      font-size: 20px;
      line-height: normal; /* Button with icon has vertical offset without this. */
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
