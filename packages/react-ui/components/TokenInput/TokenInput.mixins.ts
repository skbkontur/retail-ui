import { css } from '../../lib/theming/Emotion';

export const helperTextEditingSizeMixin = (tokenFontSize: string) => {
  return css`
    font-size: ${tokenFontSize};
  `;
};

export const helperContainerAndLabelCommonSizeMixin = (tokenInputPaddingY: string, tokenInputPaddingX: string) => {
  return css`
    padding: ${tokenInputPaddingY} ${tokenInputPaddingX};
  `;
};

export const reservedInputSizeMixin = (tokenInputLineHeight: string, tokenInputFontSize: string, tokenMarginY: string, tokenInputInputPaddingRight: string, tokenInputInputPaddingLeft: string) => {
  return css`
    min-height: ${tokenInputLineHeight};
    line-height: ${tokenInputLineHeight};
    font-size: ${tokenInputFontSize};
    margin: ${tokenMarginY} 0 ${tokenMarginY} 0;
    padding: 0 ${tokenInputInputPaddingRight} 0 ${tokenInputInputPaddingLeft};
  `;
};

export const inputAndHelperCommonStyles = (inputPaddingRight: string, inputPaddingLeft: string, lineHeight: string, fontSize: string) => {
  return css`
    padding: 0 ${inputPaddingRight} 0 ${inputPaddingLeft};
    line-height: ${lineHeight};
    font-size: ${fontSize};
  `;
};

export const inputSizeMixin = (lineHeight: string, tokenMarginY: string, tokenMarginX: string) => {
  return css`
    height: ${lineHeight};
    margin: ${tokenMarginY} 0 ${tokenMarginY} ${tokenMarginX} ;
  `;
};

export const inputAndHelperCommonEditingStylesSizeMixin = (tokenMarginY: string, tokenMarginX: string, tokenInputInputPaddingRight: string, tokenPaddingX: string, tokenLineHeight: string) => {
  return css`
    margin: ${tokenMarginY} ${tokenMarginX};
    padding: 0 ${tokenInputInputPaddingRight} 0 ${tokenPaddingX};
    line-height: ${tokenLineHeight};
  `;
};
