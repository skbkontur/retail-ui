import { css, memoizeStyle } from '../../lib/theming/Emotion';

export const styles = memoizeStyle({
  icon() {
    return css`
      text-align: center;
    `;
  },

  title() {
    return css`
      text-align: center;
      margin-top: 16px;
    `;
  },

  actions() {
    return css`
      display: flex;
      justify-content: stretch;
      text-align: center;
      gap: 8px;

      > * {
        width: 100%;
      }
    `;
  },

  actionsCancelIndent() {
    return css`
      > *:nth-of-type(3) {
        margin-top: 8px;
      }
    `;
  },

  actionsCancelIndentIE11Fallback() {
    return css`
      > *:nth-of-type(3) {
        margin-top: 16px !important;
      }
    `;
  },

  actionsRow() {
    return css`
      flex-direction: row;
    `;
  },

  actionsColumn() {
    return css`
      flex-direction: column;
    `;
  },

  actionsRowIE11Fallback() {
    return css`
      > *:nth-of-type(1) {
        margin-right: 4px;
      }
      > *:nth-of-type(2) {
        margin-left: 4px;
      }
    `;
  },

  actionsColumnIE11Fallback() {
    return css`
      > *:nth-of-type(2) {
        margin-top: 8px;
      }
      > *:nth-of-type(3) {
        margin-top: 8px;
      }
    `;
  },
});
