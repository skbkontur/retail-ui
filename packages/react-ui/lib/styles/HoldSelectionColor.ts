import { injectGlobal } from '../theming/Emotion';
import { isChrome } from '../client';

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

  *,
  *:hover,
  *::before,
  *::after {
    animation-delay: -0.0001ms !important;
    animation-duration: 0s !important;
    animation-play-state: paused !important;
    cursor: none !important;
    caret-color: transparent !important;
    transition: 0s !important;
  }
`;
