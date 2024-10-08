import type { Emotion } from '@emotion/css/create-instance';

export const menuFooterSizeMixin =
  (emotion: Emotion) =>
  (
    menuFooterLegacyPaddingRight: string,
    menuFooterPaddingX: string,
    menuFooterFontSize: string,
    menuFooterLineHeight: string,
    menuFooterPaddingTop: string,
    menuFooterPaddingBottom: string,
  ) => {
    const legacyPaddingRight = parseFloat(menuFooterLegacyPaddingRight);
    const paddingRight =
      legacyPaddingRight !== 0 ? `${parseFloat(menuFooterPaddingX) + legacyPaddingRight}px` : menuFooterPaddingX;

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
