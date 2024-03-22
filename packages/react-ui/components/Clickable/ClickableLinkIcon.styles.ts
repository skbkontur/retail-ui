import { Theme } from '../../lib/theming/Theme';
import { memoizeStyle, css } from '../../lib/theming/Emotion';

export const linkIconStyles = memoizeStyle({
  linkIcon(t: Theme) {
    return css`
      display: inline-block;
      margin-right: ${t.linkIconMarginRight};
    `;
  },
  linkIconLeft(t: Theme) {
    return css`
      margin-right: ${t.linkIconMarginRight};
    `;
  },
  linkIconRight(t: Theme) {
    return css`
      margin-left: ${t.linkIconMarginLeft};
    `;
  },
});
