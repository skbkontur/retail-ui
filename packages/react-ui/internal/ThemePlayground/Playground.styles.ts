import { css, memoizeStyle } from '../../lib/theming/Emotion';
import type { Theme } from '../../lib/theming/Theme';

export const styles = memoizeStyle({
  playground() {
    return css`
      margin: 0 -24px;
      padding: 0 24px;
      border-radius: 8px;
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
      overflow-x: hidden;
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
});
