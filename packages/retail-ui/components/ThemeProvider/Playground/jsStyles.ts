import { css } from '../../../lib/theming/Emotion';
import { PlaygroundTheme } from '../__stories__/ThemeProvider.stories';

const jsStyles = {
  stickyTabsWrapper(t: PlaygroundTheme) {
    return css`
      &:after {
        box-shadow: 0 2px 10px 0px ${t.textColorMain || 'black'};
      }
    `;
  },
  tabsInnerWrapper(t: PlaygroundTheme) {
    return css`
      color: ${t.textColorMain};
    `;
  },
  playgroundWrapper(t: PlaygroundTheme) {
    return css`
      background: ${t.backgroundMain};
    `;
  },
  editorHeaderWrapper(t: PlaygroundTheme) {
    return css`
      color: ${t.textColorMain};
    `;
  },
};

export default jsStyles;
