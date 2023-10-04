import { css } from '../../lib/theming/Emotion';

export const paddingSizeMixin = (tokenInputPaddingY: string, tokenInputPaddingX: string) => {
  return css`
    padding: ${tokenInputPaddingY} ${tokenInputPaddingX};
  `;
};

export const inputSizeMixin = (fontSize: string, lineHeight: string) => {
  return css`
    font-size: ${fontSize};
    height: ${lineHeight};
  `;
};
