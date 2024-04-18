import { css } from '../../lib/theming/Emotion';

export const labelSizeMixin = (tokenInputPaddingY: string, tokenInputPaddingX: string) => {
  return css`
    padding: ${tokenInputPaddingY} ${tokenInputPaddingX};
  `;
};

export const inputSizeMixin = (fontSize: string, lineHeight: string) => {
  return css`
    font-size: ${fontSize};
    height: ${lineHeight};
    line-height: ${lineHeight};
  `;
};
