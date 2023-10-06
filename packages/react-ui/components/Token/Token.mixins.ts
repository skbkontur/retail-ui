import { css } from '../../lib/theming/Emotion';

export const tokenSizeMixin = (
  tokenPaddingY: string,
  tokenPaddingX: string,
  lineHeight: string,
  fontSize: string,
  tokenMarginY: string,
  tokenMarginX: string,
) => {
  return css`
    padding: ${tokenPaddingY} ${tokenPaddingX};
    margin: ${tokenMarginY} ${tokenMarginX};
    line-height: ${lineHeight};
    height: ${lineHeight};
    font-size: ${fontSize};
  `;
};
