import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  icon() {
    return css`
      text-align: center;
    `;
  },

  title(t: Theme) {
    return css`
      text-align: center;
      margin-top: ${t.miniModalTitleMarginTop};
    `;
  },

  actions(t: Theme) {
    return css`
      display: flex;
      justify-content: stretch;
      text-align: center;
      gap: ${t.miniModalActionGap};

      > * {
        width: 100%;
      }
    `;
  },

  actionsCancelIndent(t: Theme) {
    return css`
      > *:nth-of-type(3) {
        margin-top: calc(-${t.miniModalActionGap} + ${t.miniModalCancelIndent});
      }
    `;
  },

  actionsCancelIndentIE11Fallback(t: Theme) {
    return css`
      > *:nth-of-type(3) {
        margin-top: ${t.miniModalCancelIndent} !important;
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

  actionsRowIE11Fallback(t: Theme) {
    return css`
      > *:nth-of-type(1) {
        margin-right: calc(${t.miniModalActionGap} / 2);
      }
      > *:nth-of-type(2) {
        margin-left: calc(${t.miniModalActionGap} / 2);
      }
    `;
  },

  actionsColumnIE11Fallback(t: Theme) {
    return css`
      > *:nth-of-type(2) {
        margin-top: ${t.miniModalActionGap};
      }
      > *:nth-of-type(3) {
        margin-top: ${t.miniModalActionGap};
      }
    `;
  },
});
