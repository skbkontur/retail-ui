import { css } from '../theming/Emotion';

export const resetButton = () => {
  return css`
    outline: none;
    border: none;
    margin: 0; /* Need for Safari. */
    padding: 0;
    width: auto;
    overflow: visible; /* On IE it's hidden by default. */
    background: transparent;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    /* Normalize 'line-height'. Cannot be changed from 'normal' in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable 'input' types in iOS */
    -webkit-appearance: none;
    text-align: inherit;

    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
  `;
};

export const resetText = () => {
  return css`
    letter-spacing: normal;
    line-height: normal;
    font-family: inherit;
    font-weight: normal;
    font-style: normal;
    font-variant: normal;
    font-stretch: normal;

    /* ie11 doesnt support 'initial' */
    text-align: left;
    text-align: initial;
    text-transform: none;
    text-shadow: none;
  `;
};
