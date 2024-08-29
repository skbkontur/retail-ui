import type { Emotion } from '@emotion/css/create-instance';

export const rootTextareaSizeMixin = (emotion: Emotion) => (fontSize: string, lineHeight: string) => {
  return emotion.css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const textareaSizeMixin = (emotion: Emotion) => (paddingY: string, paddingX: string, minHeight: string) => {
  return emotion.css`
    min-height: ${minHeight};
    padding: ${paddingY} ${paddingX};
  `;
};

export const counterSizeMixin = (emotion: Emotion) => (paddingX: string, paddingY: string) => {
  return emotion.css`
    right: ${paddingY};
    bottom: ${paddingX};
  `;
};
