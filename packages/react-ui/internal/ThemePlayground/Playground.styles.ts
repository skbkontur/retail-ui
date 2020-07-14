import { css, memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

const styles = {
  playground() {
    return css`
      margin: -16px;
      padding: 32px;
    `;
  },

  title(t: Theme) {
    return css`
      width: 110px;
      color: ${t.textColorDefault};
    `;
  },

  componentsGroup(t: Theme) {
    return css`
      max-width: 700px;
      color: ${t.textColorDefault};
    `;
  },

  sidePageBody() {
    return css`
      padding: 0 30px 30px;
    `;
  },

  variable(t: Theme) {
    return css`
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      &:focus {
        outline: 1px solid ${t.borderColorFocus};
        outline-offset: 8px;
      }
    `;
  },

  variableName(t: Theme) {
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 250px;
      position: relative;
      z-index: 1;
      line-height: 34px;
      color: ${t.textColorDefault};
      flex: 1 1 auto;
    `;
  },

  deprecated() {
    return css`
      text-decoration: line-through;
    `;
  },

  colorIcon() {
    return css`
      height: 16px;
      width: 16px;
    `;
  },

  baseLinkWrapper() {
    return css`
      margin-left: auto;
    `;
  },

  linkRoot() {
    return css`
      position: relative;
      z-index: 1;
    `;
  },

  baseVariableRoot() {
    return css`
      position: relative;
      z-index: 1;
      padding-left: 10px;
      width: 240px;
      display: flex;
    `;
  },

  loaderWrapper() {
    return css`
      width: 500px;
    `;
  },

  loader() {
    return css`
      height: 300px;
      margin: auto;
    `;
  },

  tabsWrapper(t: Theme) {
    return css`
      margin: 0 -32px;
      padding: 11px 32px;
      position: relative;
      color: ${t.textColorDefault};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        height: 1px;
        width: 100%;
        z-index: -1;
      }
    `;
  },

  tooltipContent() {
    return css`
      width: 210px;
    `;
  },

  stickyTabsWrapper(t: Theme) {
    return css`
      &:after {
        box-shadow: 0 2px 10px 0px ${t.textColorDefault};
      }
    `;
  },
  tabsInnerWrapper(t: Theme) {
    return css`
      color: ${t.textColorDefault};
    `;
  },
  playgroundWrapper(t: Theme) {
    return css`
      background: ${t.bgDefault};
    `;
  },
  editorHeaderWrapper(t: Theme) {
    return css`
      color: ${t.textColorDefault};
    `;
  },
  editorGroupHeader(t: Theme) {
    return css`
      color: ${t.textColorDefault};
    `;
  },
};

export const jsStyles = memoizeStyle(styles);
