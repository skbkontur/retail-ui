import { injectGlobal } from '../theming/Emotion';
import { isChrome, isFirefox, isIE11 } from '../utils';

// This is for screenshot tests
const Highlight = isIE11 || isFirefox ? '#3399ff' : isChrome ? '#3390ff' : 'Highlight';

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  *::selection {
    background-color: ${Highlight};
  }
  input::selection,
  textarea::selection {
    color: white;
  }
`;
