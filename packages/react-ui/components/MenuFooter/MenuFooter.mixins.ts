import { css } from '../../lib/theming/Emotion';

export const menuFooterSizeMixin = (
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

  return css`
    font-size: ${menuFooterFontSize};
    line-height: ${menuFooterLineHeight};
    padding: ${menuFooterPaddingTop} ${paddingRight} ${menuFooterPaddingBottom} ${menuFooterPaddingX};
  `;
};

export const withIconSizeMixin = (menuItemPaddingForIcon: string) => {
  return css`
    padding-left: ${menuItemPaddingForIcon};
  `;
};
