import { css, memoizeStyle, prefix } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const globalClasses = prefix('select')({
  arrow: 'arrow',
});

export const styles = memoizeStyle({
  root(t: Theme) {
    return css`
      color: ${t.dateSelectTextColorDefault};
      cursor: pointer;
      display: inline-block;
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

  root2022() {
    return css`
      display: inline-flex;
      justify-content: space-between;
    `;
  },

  disabled() {
    return css`
      color: inherit !important; // override root:hover style
      cursor: default;
    `;
  },

  caption() {
    return css`
      position: relative;
    `;
  },

  arrow(t: Theme) {
    return css`
      color: ${t.dateSelectTextColorDisabled};
      float: right;
      line-height: ${t.dateSelectLineHeight};
      opacity: 1;
      position: absolute;
      right: 4px;
      top: 0;
      transform: scaleX(0.7);
      transition: opacity 0.2s ease-out;
    `;
  },
  arrowDisabled() {
    return css`
      opacity: 0;
    `;
  },
});
