import { css } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import * as ColorFunctions from '../../lib/styles/ColorFunctions';

import styles from './Token.module.less';

export const jsStyles = {
  disabled(t: Theme) {
    return css`
      color: ${t.textColorDisabled};
    `;
  },
};

interface TokenColors {
  defaultIdle: (t: Theme) => string;
  defaultActive: (t: Theme) => string;
  defaultDisabled: (t: Theme) => string;
  grayIdle: (t: Theme) => string;
  grayActive: (t: Theme) => string;
  blueIdle: (t: Theme) => string;
  blueActive: (t: Theme) => string;
  greenIdle: (t: Theme) => string;
  greenActive: (t: Theme) => string;
  yellowIdle: (t: Theme) => string;
  yellowActive: (t: Theme) => string;
  redIdle: (t: Theme) => string;
  redActive: (t: Theme) => string;
  white: (t: Theme) => string;
  black: (t: Theme) => string;
}

export const jsTokenColors = [
  { name: 'defaultIdle', color: 'grayXLight' },
  { name: 'defaultActive', color: 'brand' },
  { name: 'grayIdle', color: 'grayXLight' },
  { name: 'grayActive', color: 'grayDark' },
  { name: 'blueIdle', color: 'blueLight' },
  { name: 'blueActive', color: 'blueDark' },
  { name: 'greenIdle', color: 'greenXxLight' },
  { name: 'greenActive', color: 'greenDark' },
  { name: 'yellowIdle', color: 'yellowXxLight' },
  { name: 'yellowActive', color: 'yellowDark' },
  { name: 'redIdle', color: 'redXxLight' },
  { name: 'redActive', color: 'redDark' },
  { name: 'white', color: 'white' },
  { name: 'black', color: 'black' },
].reduce(
  (colors: TokenColors, { name, color }) => ({
    ...colors,
    [name](t: Theme) {
      return css`
        background-color: ${t[color]};
        color: ${ColorFunctions.contrast(t[color])};
        box-shadow: 0 0 0 1px ${ColorFunctions.darken(t[color], '5%')}, inset 0 0 0 1px ${t[color]};

        & .${styles.removeIcon}:hover {
          color: ${ColorFunctions.contrast(t[color])};
        }

        &.${styles.warning} {
          box-shadow: 0 0 0 2px ${t.borderColorWarning}, inset 0 0 0 1px ${t[color]};
        }

        &.${styles.error} {
          box-shadow: 0 0 0 2px ${t.borderColorError}, inset 0 0 0 1px ${t[color]};
        }
      `;
    },
  }),
  {
    defaultDisabled(t: Theme) {
      return css`
        background-color: ${t.tokenDisabledBg};
        color: ${ColorFunctions.contrast(t.tokenDisabledBg)};
        box-shadow: 0 0 0 1px ${t.tokenDisabledBg};

        & .${styles.removeIcon} {
          fill: ${t.textColorDisabled};
          opacity: 1;
        }

        &.${styles.warning} {
          box-shadow: 0 0 0 2px ${t.borderColorWarning}, inset 0 0 0 1px ${t.tokenDisabledBg};
        }

        &.${styles.error} {
          box-shadow: 0 0 0 2px ${t.borderColorError}, inset 0 0 0 1px ${t.tokenDisabledBg};
        }
      `;
    },
  } as TokenColors,
);
