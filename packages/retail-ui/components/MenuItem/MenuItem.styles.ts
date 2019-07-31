import { ITheme } from '../../lib/theming/Theme';
import { css } from '../../lib/theming/Emotion';
import { resetButton } from '../../lib/styles/Mixins';

const jsStyles = {
  root(t: ITheme) {
    return css`
      ${resetButton()};

      line-height: 18px;
      padding: 6px 18px 7px 8px;
    `;
  },
  hover(t: ITheme) {
    // Color with !important in purpose to override `a:hover`
    return css`
      background: ${t.dropdownMenuHoverBg};
      color: ${t.textColorInvert} !important;
    `;
  },
  selected(t: ITheme) {
    return css`
      background: ${t.dropdownMenuSelectedBg};
    `;
  },
  disabled(t: ITheme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },
  link(t: ITheme) {
    return css`
      color: ${t.linkColor};
    `;
  },
  withIcon(t: ITheme) {
    return css`
      padding-left: ${t.menuItemPaddingForIcon};
    `;
  },
};

export default jsStyles;
