import type { Emotion } from '@emotion/css/create-instance';

export const tokenSizeMixin =
  (emotion: Emotion) =>
  (
    tokenPaddingY: string,
    tokenPaddingX: string,
    lineHeight: string,
    fontSize: string,
    tokenMarginY: string,
    tokenMarginX: string,
  ) => {
    return emotion.css`
    padding: ${tokenPaddingY} ${tokenPaddingX};
    margin: ${tokenMarginY} ${tokenMarginX};
    line-height: ${lineHeight};
    font-size: ${fontSize};
  `;
  };
