import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    searchBar(t: Theme) {
      return emotion.css`
        position: relative;
        box-sizing: border-box;
        height: 40px;
        padding: 5px;
        background-color: ${t.bgDefault};

        &::after {
          content: attr(data-perf-info);
          position: absolute;
          top: 11px;
          right: 20px;
          color: #808080;
          height: 20px;
          line-height: 20px;
        }
      `;
    },

    heading(t: Theme) {
      return emotion.css`
        padding: 24px 0 16px 5px;
        margin: 0;
        background-color: ${t.bgDefault};
      `;
    },

    headingSticky() {
      return emotion.css`
        border-bottom: 1px solid #e8e8e8;
      `;
    },

    table() {
      return emotion.css`
        width: 880px;
        border-collapse: collapse;
      `;
    },

    headerCell() {
      return emotion.css`
        text-align: left;
        padding-left: 5px;
      `;
    },

    row() {
      return emotion.css`
        &:hover {
          background-color: #f8f8f8;
        }
      `;
    },
    darkRow() {
      return emotion.css`
        &:hover {
          background-color: rgba(255, 255, 255, 0.04);
        }
      `;
    },

    cell() {
      return emotion.css`
        border-top: 0 none;
        border-bottom: 1px solid #e8e8e8;
        vertical-align: top;
        padding: 10px 5px;
      `;
    },

    invisibleRow() {
      return emotion.css`
        padding: 0;
        height: 0;

        &:hover,
        &:hover ~ tr {
          background-color: #f8f8f8;
        }

        &:hover ~ &,
        &:hover ~ & ~ tr {
          background-color: transparent;
        }
      `;
    },
    invisibleDarkRow() {
      return emotion.css`
        &:hover,
        &:hover ~ tr {
          background-color: rgba(255, 255, 255, 0.04);
        }
      `;
    },

    suspiciousRow() {
      return emotion.css`
        background-color: red;
      `;
    },

    //noinspection CssReplaceWithShorthandSafely
    majorCell() {
      return emotion.css`
        border-top: 1px solid #e8e8e8;
      `;
    },

    invisibleCell() {
      return emotion.css`
        padding: 0;
        height: 0;
        font-size: 0;
        line-height: 0;
        border: 0 none;
        border-top: 1px solid #e8e8e8;
      `;
    },

    suspiciousCell() {
      return emotion.css`
        background-color: #fff0bc;
      `;
    },

    elementName() {
      return emotion.css`
        color: #7f9a44;
        font-weight: 400;
      `;
    },

    relativeCss() {
      return emotion.css`
        white-space: pre;
        color: #333;
      `;
    },

    variableName() {
      return emotion.css`
        color: #b77daa;
        font-weight: 400;
        cursor: pointer;
      `;
    },

    colorExample() {
      return emotion.css`
        display: inline-block;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 1px solid transparent;
        margin-right: 4px;
        vertical-align: -3px;
      `;
    },

    undefined() {
      return emotion.css`
        text-decoration: line-through;
      `;
    },

    unusedVariablesWarning() {
      return emotion.css`
        padding: 16px;
        margin: 20px 0;
        background-color: #fff0bc;
        border-radius: 3px;
      `;
    },

    cssClassObject() {
      return emotion.css`
        color: #d28445;
      `;
    },

    cssClassName() {
      return emotion.css`
        color: #7f9a44;
      `;
    },

    cssThemeObject() {
      return emotion.css`
        color: #ac4142;
      `;
    },

    cssThemeProp() {
      return emotion.css`
        color: #b77daa;
      `;
    },
  });
