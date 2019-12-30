import { Theme } from '../../lib/theming/Theme';
import { css } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

export const jsStyles = {
  root(t: Theme) {
    return css`
      ${resetButton()};

      line-height: 18px;
      padding: 6px 18px 7px 8px;
    `;
  },
  hover(t: Theme) {
    // Color with !important in purpose to override `a:hover`
    return css`
      background: ${t.dropdownMenuHoverBg};
      color: ${t.textColorInvert} !important;
    `;
  },
  selected(t: Theme) {
    return css`
      background: ${t.dropdownMenuSelectedBg};
    `;
  },
  disabled(t: Theme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },
  link(t: Theme) {
    return css`
      color: ${t.linkColor};
    `;
  },
  withIcon(t: Theme) {
    return css`
      padding-left: ${t.menuItemPaddingForIcon};
    `;
  },
};
