import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('select')({
  arrow: 'arrow',
});

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root(t: Theme) {
      return emotion.css`
        color: ${t.dateSelectTextColorDefault};
        cursor: pointer;
        display: inline-flex;
        justify-content: space-between;
        font: inherit;
        font-size: ${t.dateSelectFontSize};
        padding: 0px;
        padding-right: 2px;
        position: relative;
        text-align: left;
        touch-action: none;
        border: none;
        line-height: ${t.dateSelectLineHeight};
        background-color: transparent;
        box-sizing: content-box;

        &:hover {
          color: ${t.dateSelectLinkColor};
        }

        & .${globalClasses.arrow} {
          transition: fill ${t.transitionDuration} ${t.transitionTimingFunction};
        }

        &:hover .${globalClasses.arrow} {
          fill: ${t.dateSelectTextColorDefault} !important;
        }
      `;
    },

    disabled() {
      return emotion.css`
        color: inherit !important; // override root:hover style
        cursor: default;
      `;
    },

    caption() {
      return emotion.css`
        position: relative;
      `;
    },
  });
