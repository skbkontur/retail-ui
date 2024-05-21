import type { Emotion } from '@emotion/css/create-instance';

export const fileUploaderSizeMixin =
  (emotion: Emotion) => (fontSize: string, lineHeight: string, paddingX: string, paddingY: string) => {
    return emotion.css`
    font-size: ${fontSize};
    box-sizing: border-box;
    padding: ${paddingY} ${paddingX};
    line-height: ${lineHeight};
  `;
  };
