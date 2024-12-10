import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';
import { globalClasses as buttonGlobalClasses } from '../Button/Button.styles';

export const styles = memoizeStyle({
  icon() {
    return css`
      text-align: center;
    `;
  },

  description() {
    return css`
      text-align: center;
    `;
  },

  title() {
    return css`
      text-align: center;
    `;
  },

  titleWithIcon(t: Theme) {
    return css`
      margin-top: ${t.miniModalTitleMarginTop};
    `;
  },

  actions(t: Theme) {
    return css`
      display: flex;
      justify-content: stretch;
      text-align: center;
      gap: ${t.miniModalActionGap};

      .${buttonGlobalClasses.root} {
        width: 100%;
      }
    `;
  },

  actionsIndent(t: Theme) {
    return css`
      height: ${t.miniModalCancelIndent};
    `;
  },

  actionsIndentIE11Fallback(t: Theme) {
    return css`
      padding: ${t.miniModalCancelIndent} 0;
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
