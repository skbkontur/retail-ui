import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const buttonCaptionStyles = memoizeStyle({
  buttonCaption() {
    return css`
      position: relative;
      white-space: nowrap;
      display: inline-block;
      width: 100%;
      vertical-align: top;
    `;
  },
  buttonCaptionDisabled() {
    return css`
      transform: none !important; // override root:active style
    `;
  },

  buttonVisibilityHidden() {
    return css`
      visibility: hidden;
    `;
  },
});
