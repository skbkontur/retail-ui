import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('masked-input')({
  root: 'root',
});

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      & input {
        display: inline-block;
        background-color: ${t.inputTextColor};
        background-size: 100%;
        background-repeat: repeat;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `;
  },
});
