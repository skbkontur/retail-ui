import type { Emotion } from '@emotion/css/create-instance';

export const menuFooterSizeMixin =
  (emotion: Emotion) =>
  (
    menuFooterPaddingX: string,
    menuFooterFontSize: string,
    menuFooterLineHeight: string,
    menuFooterPaddingTop: string,
    menuFooterPaddingBottom: string,
  ) => {
    const paddingRight = menuFooterPaddingX;

    return emotion.css`
    font-size: ${menuFooterFontSize};
    line-height: ${menuFooterLineHeight};
    padding: ${menuFooterPaddingTop} ${paddingRight} ${menuFooterPaddingBottom} ${menuFooterPaddingX};
  `;
  };

export const withIconSizeMixin = (emotion: Emotion) => (menuItemPaddingForIcon: string) => {
  return emotion.css`
    padding-left: ${menuItemPaddingForIcon};
  `;
};
