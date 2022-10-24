import { css } from '../../lib/theming/Emotion';

export const fileUploaderSizeMixin = (fontSize: string, lineHeight: string, paddingX: string, paddingY: string) => {
  return css`
    font-size: ${fontSize};
    box-sizing: border-box;
    padding: ${paddingY} ${paddingX};
    line-height: ${lineHeight};
  `;
};
