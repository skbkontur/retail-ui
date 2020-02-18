import { css, cssName } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const jsStyles = {
  root(t: Theme) {
    return css`
      display: inline-block;
      position: relative;
    `;
  },

  placeholder(t: Theme) {
    return css`
      color: ${t.sltPlaceholderColor};
      text-overflow: ellipsis;
    `;
  },

  customUsePlaceholder() {
    return css`
      color: inherit;
      opacity: 0.7;
    `;
  },

  arrow(t: Theme) {
    return css`
      border: 4px solid transparent;
      border-bottom-width: 0;
      border-top-color: ${t.btnMenuArrowColor};

      ${cssName(jsStyles.arrowWrap())} & {
        display: inline-block;
        margin-bottom: 3px;
        vertical-align: middle;
      }
    `;
  },

  arrowWrap() {
    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      padding: 0 10px;

      &::before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
    `;
  },

  customUseArrow() {
    return css`
      border-top-color: inherit;
      color: inherit;
      opacity: 0.7;
    `;
  },

  label() {
    return css`
      box-sizing: border-box;
      display: inline-block;
      padding: 0 28px 0 9px;
      max-width: 100%;
      width: 100%;
      position: relative;
    `;
  },

  labelText() {
    return css`
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: top;
      white-space: nowrap;
    `;
  },

  labelWithLeftIcon() {
    return css`
      padding-left: 0;
    `;
  },

  search() {
    return css`
      margin: 1px 4px 4px;
    `;
  },
};
