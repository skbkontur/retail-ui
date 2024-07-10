import { css, memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const styles = memoizeStyle({
  input(t: Theme) {
    return css`
      display: inline-block;
      background-color: ${t.inputTextColor};
      background-size: 100%;
      background-repeat: repeat;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    `;
  },
  inputPlaceholder(t: Theme) {
    return css`
      background-color: ${t.inputPlaceholderColor};
    `;
  },
});
