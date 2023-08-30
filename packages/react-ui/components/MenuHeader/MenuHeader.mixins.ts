import { css } from '../../lib/theming/Emotion';

export const menuHeaderSizeMixin = (
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

  return css`
    font-size: ${menuHeaderFontSize};
    line-height: ${menuHeaderLineHeight};
    padding: ${menuHeaderPaddingTop} ${paddingRight} ${menuHeaderPaddingBottom} ${menuHeaderPaddingX};
  `;
};

export const withIconSizeMixin = (menuItemPaddingForIcon: string) => {
  return css`
    padding-left: ${menuItemPaddingForIcon};
  `;
};
