import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { globalClasses as buttonGlobalClasses } from '../Button/Button.styles';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    icon() {
      return emotion.css`
        text-align: center;
      `;
    },

    description() {
      return emotion.css`
        text-align: center;
      `;
    },

    title() {
      return emotion.css`
        text-align: center;
      `;
    },

    titleWithIcon(t: Theme) {
      return emotion.css`
        margin-top: ${t.miniModalTitleMarginTop};
      `;
    },

    actions(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        height: ${t.miniModalCancelIndent};
      `;
    },

    actionsIndentIE11Fallback(t: Theme) {
      return emotion.css`
        padding: ${t.miniModalCancelIndent} 0;
      `;
    },

    actionsRow() {
      return emotion.css`
        flex-direction: row;
      `;
    },

    actionsColumn() {
      return emotion.css`
        flex-direction: column;
      `;
    },

    actionsRowIE11Fallback(t: Theme) {
      return emotion.css`
        > *:nth-of-type(1) {
          margin-right: calc(${t.miniModalActionGap} / 2);
        }
        > *:nth-of-type(2) {
          margin-left: calc(${t.miniModalActionGap} / 2);
        }
      `;
    },

    actionsColumnIE11Fallback(t: Theme) {
      return emotion.css`
        > *:nth-of-type(2) {
          margin-top: ${t.miniModalActionGap};
        }
        > *:nth-of-type(3) {
          margin-top: ${t.miniModalActionGap};
        }
      `;
    },
  });
