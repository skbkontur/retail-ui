import type { Emotion } from '@emotion/css/create-instance';

export const menuHeaderSizeMixin =
  (emotion: Emotion) =>
  (
    menuHeaderPaddingX: string,
    menuHeaderFontSize: string,
    menuHeaderLineHeight: string,
    menuHeaderPaddingTop: string,
    menuHeaderPaddingBottom: string,
  ) => {
    const paddingRight = menuHeaderPaddingX;

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
