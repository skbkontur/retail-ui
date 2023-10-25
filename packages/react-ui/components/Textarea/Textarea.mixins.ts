import { css } from '../../lib/theming/Emotion';

export const rootTextareaSizeMixin = (fontSize: string, lineHeight: string) => {
  return css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `;
};

export const textareaSizeMixin = (paddingY: string, paddingX: string, minHeight: string) => {
  return css`
    min-height: ${minHeight};
    padding: ${paddingY} ${paddingX};
  `;
};

export const counterSizeMixin = (paddingX: string, paddingY: string) => {
  return css`
    right: ${paddingY};
    bottom: ${paddingX};
  `;
};
