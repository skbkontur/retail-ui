import { Theme } from '../../lib/theming/Theme';
import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
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

  mobileContent(t: Theme) {
    return css`
      color: ${t.mobileHintColor};
      max-width: 100%;
      text-align: left;
    `;
  },

  contentCenter(t: Theme) {
    return css`
      text-align: ${t.hintTextAlign};
    `;
  },
});
