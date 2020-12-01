import { injectGlobal } from '../theming/Emotion';
import { isChrome } from '../utils';

// This is for screenshot tests
const Highlight = isChrome ? '#3390ff' : '#3399ff';

injectGlobal`
  *::selection {
    background-color: ${Highlight};
  }
  input::selection,
  textarea::selection {
    color: white;
  }
`;
