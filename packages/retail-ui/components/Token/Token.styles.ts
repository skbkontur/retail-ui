import { css } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import ColorFunctions from '../../lib/styles/ColorFunctions';
import styles from './Token.module.less';

export default {
  token(t:ITheme) {
    return css`
      display: inline-flex;
      align-items: center;
      border-radius: ${t.tokenBorderRadius};
      padding: 0 ${t.tokenPaddingX};
      line-height: ${t.tokenLineHeight};
      font-size: ${t.tokenFontSize};
      margin: ${t.tokenMargin};
      min-width: 0;
      word-break: break-word;
      user-select: none;
      &:hover {
        cursor: pointer;
      }
    `;
  },
  disabled(t: ITheme) {
    return css`
      box-shadow: none !important;
      margin: 2px;
      padding: 1px ${t.tokenPaddingX};
      user-select: text;
      cursor: text;
      color: ${t.tokenTextColorDisabled} !important;
     `;
  },
  removeIcon(t: ITheme) {
    return css`
      height: 1em;
      width: 1em;
      flex-shrink: 0;
      padding: 2px;
      box-sizing: border-box;
      margin-left: ${t.tokenMarginBeforeIcon};
      transition: none;
      fill: currentColor;
      opacity: 0.5;
      line-height: 0;
      &:hover {
        opacity: 1;
      }
    `
},};

interface TokenColors {
  defaultIdle: (t: ITheme) => string;
  defaultActive: (t: ITheme) => string;
  defaultDisabled: (t: ITheme) => string;
  grayIdle: (t: ITheme) => string;
  grayActive: (t: ITheme) => string;
  blueIdle: (t: ITheme) => string;
  blueActive: (t: ITheme) => string;
  greenIdle: (t: ITheme) => string;
  greenActive: (t: ITheme) => string;
  yellowIdle: (t: ITheme) => string;
  yellowActive: (t: ITheme) => string;
  redIdle: (t: ITheme) => string;
  redActive: (t: ITheme) => string;
  white: (t: ITheme) => string;
  black: (t: ITheme) => string;
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
    [name](t: ITheme) {
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
    defaultDisabled(t: ITheme) {
      return css`
        background-color: ${t.tokenDisabledBg};
        color: ${ColorFunctions.contrast(t.tokenDisabledBg)};
        box-shadow: 0 0 0 1px ${t.tokenDisabledBg};

        & .${styles.removeIcon} {
          fill: ${t.tokenTextColorDisabled};
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
