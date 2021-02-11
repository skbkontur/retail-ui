import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  root() {
    return css`
      display: inline-block;
      user-select: none;
      cursor: default;
    `;
  },

  item(t: Theme) {
    return css`
      display: table;
      margin-top: ${t.radioGroupLegacyItemGap};
      width: 100%;
    `;
  },

  itemFirst() {
    return css`
      margin-top: 0;
    `;
  },

  itemInline() {
    return css`
      display: inline-table;
      margin-right: 15px;
      margin-top: 0;
      width: auto;
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
