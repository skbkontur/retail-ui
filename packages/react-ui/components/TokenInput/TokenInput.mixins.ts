import type { Emotion } from '@emotion/css/create-instance';

export const labelSizeMixin = (emotion: Emotion) => (tokenInputPaddingY: string, tokenInputPaddingX: string) => {
  return emotion.css`
    padding: ${tokenInputPaddingY} ${tokenInputPaddingX};
  `;
};

export const inputSizeMixin = (emotion: Emotion) => (fontSize: string, lineHeight: string) => {
  return emotion.css`
    font-size: ${fontSize};
    height: ${lineHeight};
    line-height: ${lineHeight};
  `;
};
