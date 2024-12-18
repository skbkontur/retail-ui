import { injectGlobal } from '../../lib/theming/Emotion';
import { isChrome } from '../../lib/client';

// This is for screenshot tests
const Highlight = isChrome ? '#3390ff' : '#3399ff';

// hold selection color
injectGlobal`
  *::selection {
    background-color: ${Highlight};
  }
  input::selection,
  textarea::selection {
    color: white;
    -webkit-text-fill-color: white;
  }
`;

// disable scrollbars (is needed for firefox 100)
// https://github.com/skbkontur/retail-ui/pull/2891#issuecomment-1145985140

injectGlobal`
  * {
    scrollbar-width: none;
  }
`;
