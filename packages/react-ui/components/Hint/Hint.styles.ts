import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

const styles = {
  content(t: Theme) {
    return css`
      box-sizing: border-box;
      color: ${t.hintColor};
      font-size: ${t.hintFontSize};
      line-height: ${t.hintLineHeight}
      max-width: ${t.hintMaxWidth};
      overflow-wrap: break-word;
      padding: ${t.hintPaddingY} ${t.hintPaddingX};
      word-break: break-word;
      word-wrap: break-word;
    `;
  },

  contentCenter(t: Theme) {
    return css`
      text-align: ${t.hintTextAlign};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
