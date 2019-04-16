import { css } from 'emotion';
import { ITheme } from '../../lib/ThemeManager';

const jsStyles = {
  popup(t: ITheme) {
    return css`
      border-radius: ${t.popupBorderRadius};
      border: ${t.popupBorder} ${t.popupBorderColor};

      .rt-ie8 & {
        border: 1px solid ${t.dropdownMenuBorder};
      }
    `;
  },

  content(t: ITheme) {
    return css`
      border-radius: ${t.popupBorderRadius};
    `;
  },

  contentInner(t: ITheme) {
    return css`
      background: ${t.bgDefault};
    `;
  },

  shadow(t: ITheme) {
    return css`
      filter: ${t.popupDropShadow};
      -webkit-filter: ${t.popupDropShadow};

      .rt-ie-any & {
        box-shadow: ${t.popupBoxShadow};
      }
    `;
  },
};

export default jsStyles;
