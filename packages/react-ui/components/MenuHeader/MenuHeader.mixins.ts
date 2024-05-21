import type { Emotion } from '@emotion/css/create-instance';

export const menuHeaderSizeMixin =
  (emotion: Emotion) =>
  (
    menuHeaderLegacyPaddingRight: string,
    menuHeaderPaddingX: string,
    menuHeaderFontSize: string,
    menuHeaderLineHeight: string,
    menuHeaderPaddingTop: string,
    menuHeaderPaddingBottom: string,
  ) => {
    const legacyPaddingRight = parseFloat(menuHeaderLegacyPaddingRight);
    const paddingRight =
      legacyPaddingRight !== 0 ? `${parseFloat(menuHeaderPaddingX) + legacyPaddingRight}px` : menuHeaderPaddingX;

    return emotion.css`
    font-size: ${menuHeaderFontSize};
    line-height: ${menuHeaderLineHeight};
    padding: ${menuHeaderPaddingTop} ${paddingRight} ${menuHeaderPaddingBottom} ${menuHeaderPaddingX};
  `;
  };

export const withIconSizeMixin = (emotion: Emotion) => (menuItemPaddingForIcon: string) => {
  return emotion.css`
    padding-left: ${menuItemPaddingForIcon};
  `;
};
