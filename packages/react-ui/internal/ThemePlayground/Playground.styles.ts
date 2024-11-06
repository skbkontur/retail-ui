import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    playground() {
      return emotion.css`
        margin: -16px;
        padding: 32px;
      `;
    },

    title(t: Theme) {
      return emotion.css`
        width: 110px;
        color: ${t.textColorDefault};
      `;
    },

    componentsGroup(t: Theme) {
      return emotion.css`
        max-width: 700px;
        color: ${t.textColorDefault};
      `;
    },

    sidePageBody() {
      return emotion.css`
        padding: 0 30px 30px;
      `;
    },

    variable(t: Theme) {
      return emotion.css`
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
      return emotion.css`
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
      return emotion.css`
        text-decoration: line-through;
      `;
    },

    colorIcon() {
      return emotion.css`
        height: 16px;
        width: 16px;
      `;
    },

    baseLinkWrapper() {
      return emotion.css`
        margin-left: auto;
      `;
    },

    linkRoot() {
      return emotion.css`
        position: relative;
        z-index: 1;
      `;
    },

    baseVariableRoot() {
      return emotion.css`
        position: relative;
        z-index: 1;
        padding-left: 10px;
        width: 240px;
        display: flex;
      `;
    },

    loaderWrapper() {
      return emotion.css`
        width: 500px;
      `;
    },

    loader() {
      return emotion.css`
        height: 300px;
        margin: auto;
      `;
    },

    tabsWrapper(t: Theme) {
      return emotion.css`
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
      return emotion.css`
        width: 210px;
      `;
    },

    stickyTabsWrapper(t: Theme) {
      return emotion.css`
      margin-top: 39px;
        &:after {
          box-shadow: 0 2px 10px 0px ${t.textColorDefault};
        }
      `;
    },
    tabsInnerWrapper(t: Theme) {
      return emotion.css`
        color: ${t.textColorDefault};
      `;
    },
    playgroundWrapper(t: Theme) {
      return emotion.css`
        background: ${t.bgDefault};
      `;
    },
    editorHeaderWrapper(t: Theme) {
      return emotion.css`
        color: ${t.textColorDefault};
      `;
    },
    editorGroupHeader(t: Theme) {
      return emotion.css`
        color: ${t.textColorDefault};
      `;
    },
  });
