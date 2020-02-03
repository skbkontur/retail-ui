import { css } from '../../lib/theming/Emotion';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';
import { Theme } from '../../lib/theming/Theme';

import styles from './Tab.module.less';

export const jsStyles = {
  root(t: Theme) {
    return css`
      color: inherit;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${t.tabColorHover};
      }
    `;
  },

  vertical(t: Theme) {
    return css`
      border-bottom: none;
      border-left: 3px solid transparent;

      .${styles.root}&:hover {
        border-left: 3px solid ${t.tabColorHover};
      }
    `;
  },

  focus(t: Theme) {
    return css`
      border: 2px solid ${t.tabColorFocus};
    `;
  },

  disabled(t: Theme) {
    return css`
      color: rgba(
        ${ColorFunctions.red(t.textColorDefault)},
        ${ColorFunctions.green(t.textColorDefault)},
        ${ColorFunctions.blue(t.textColorDefault)},
        0.5
      );
    `;
  },

  primary(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverPrimary};
      }
      &.${styles.vertical}:hover {
        border-left-color: ${t.tabColorHoverPrimary};
      }
    `;
  },

  success(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverSuccess};
      }
      &.${styles.vertical}:hover {
        border-left-color: ${t.tabColorHoverSuccess};
      }
    `;
  },

  warning(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverWarning};
      }
      &.${styles.vertical}:hover {
        border-left-color: ${t.tabColorHoverWarning};
      }
    `;
  },

  error(t: Theme) {
    return css`
      &:hover {
        border-bottom-color: ${t.tabColorHoverError};
      }
      &.${styles.vertical}:hover {
        border-left-color: ${t.tabColorHoverError};
      }
    `;
  },
};
