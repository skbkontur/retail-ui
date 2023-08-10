import { css } from '../../lib/theming/Emotion';

export const tokenSizeMixin = (tokenPaddingY: string, tokenPaddingX: string, lineHeight: string, fontSize: string) => {
  return css`
    padding: ${tokenPaddingY} ${tokenPaddingX};
    line-height: ${lineHeight};
    font-size: ${fontSize};
  `;
};
