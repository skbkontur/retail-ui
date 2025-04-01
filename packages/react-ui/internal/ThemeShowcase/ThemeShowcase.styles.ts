import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  searchBar(t: Theme) {
    return css`
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
    return css`
      padding: 24px 0 16px 5px;
      margin: 0;
      background-color: ${t.bgDefault};
    `;
  },

  headingSticky() {
    return css`
      border-bottom: 1px solid #e8e8e8;
    `;
  },

  table() {
    return css`
      width: 880px;
      border-collapse: collapse;
    `;
  },

  headerCell() {
    return css`
      text-align: left;
      padding-left: 5px;
    `;
  },

  row() {
    return css`
      &:hover {
        background-color: #f8f8f8;
      }
    `;
  },
  darkRow() {
    return css`
      &:hover {
        background-color: rgba(255, 255, 255, 0.04);
      }
    `;
  },

  cell() {
    return css`
      border-top: 0 none;
      border-bottom: 1px solid #e8e8e8;
      vertical-align: top;
      padding: 10px 5px;
    `;
  },

  invisibleRow() {
    return css`
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
    return css`
      &:hover,
      &:hover ~ tr {
        background-color: rgba(255, 255, 255, 0.04);
      }
    `;
  },

  suspiciousRow() {
    return css`
      background-color: red;
    `;
  },

  //noinspection CssReplaceWithShorthandSafely
  majorCell() {
    return css`
      border-top: 1px solid #e8e8e8;
    `;
  },

  invisibleCell() {
    return css`
      padding: 0;
      height: 0;
      font-size: 0;
      line-height: 0;
      border: 0 none;
      border-top: 1px solid #e8e8e8;
    `;
  },

  suspiciousCell() {
    return css`
      background-color: #fff0bc;
    `;
  },

  elementName() {
    return css`
      color: #7f9a44;
      font-weight: 400;
    `;
  },

  relativeCss() {
    return css`
      white-space: pre;
      color: #333;
    `;
  },

  variableName() {
    return css`
      color: #b77daa;
      font-weight: 400;
      cursor: pointer;
    `;
  },

  colorExample() {
    return css`
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
    return css`
      text-decoration: line-through;
    `;
  },

  unusedVariablesWarning() {
    return css`
      padding: 16px;
      margin: 20px 0;
      background-color: #fff0bc;
      border-radius: 3px;
    `;
  },

  cssClassObject() {
    return css`
      color: #d28445;
    `;
  },

  cssClassName() {
    return css`
      color: #7f9a44;
    `;
  },

  cssThemeObject() {
    return css`
      color: #ac4142;
    `;
  },

  cssThemeProp() {
    return css`
      color: #b77daa;
    `;
  },
});
