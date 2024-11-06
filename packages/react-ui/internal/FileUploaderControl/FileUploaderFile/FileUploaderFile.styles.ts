import type { Emotion } from '@emotion/css/create-instance';

import { memoizeStyle } from '../../../lib/theming/Emotion';
import { Theme } from '../../../lib/theming/Theme';

export const getStyles = (emotion: Emotion) =>
  memoizeStyle({
    root() {
      return emotion.css`
      width: 100%;
    `;
    },

    content() {
      return emotion.css`
      display: flex;
      width: 100%;
      align-items: center;
    `;
    },

    error(t: Theme) {
      return emotion.css`
      color: ${t.fileUploaderBorderColorError};
    `;
    },

    name() {
      return emotion.css`
      flex: 1 1 100%;
      overflow: hidden;
    `;
    },

    size() {
      return emotion.css`
      margin-left: 28px;
      flex: 1 0 auto;
    `;
    },

    icon(t: Theme) {
      return emotion.css`
      width: 16px;
      flex: 1 0 auto;
      cursor: pointer;
      font-size: ${t.fileUploaderIconSize};
      text-align: right;
      outline: none;
    `;
    },

    iconSmall() {
      return emotion.css`
      margin-left: 4px;
    `;
    },

    iconMedium() {
      return emotion.css`
      margin-left: 6px;
      width: 18px;
    `;
    },

    iconLarge() {
      return emotion.css`
      margin-left: 6px;
      width: 20px;
    `;
    },

    iconMultiple() {
      return emotion.css`
      position: static;
    `;
    },

    contentSmall(t: Theme) {
      return emotion.css`
      font-size: ${t.fileUploaderFontSizeSmall};
    `;
    },

    contentMedium(t: Theme) {
      return emotion.css`
      font-size: ${t.fileUploaderFontSizeMedium};
    `;
    },

    contentLarge(t: Theme) {
      return emotion.css`
      font-size: ${t.fileUploaderFontSizeLarge};
    `;
    },

    deleteIcon(t: Theme) {
      return emotion.css`
      color: ${t.fileUploaderIconColor};
      &:hover {
        color: ${t.fileUploaderIconHoverColor};
      }
    `;
    },

    focusedIcon(t: Theme) {
      return emotion.css`
      outline: 1px solid ${t.borderColorFocus};
    `;
    },
  });
