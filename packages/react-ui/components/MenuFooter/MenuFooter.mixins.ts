import { css } from '../../lib/theming/Emotion';

export const menuFooterSizeMixin = (
  menuFooterPaddingX: string,
  menuFooterFontSize: string,
  menuFooterLineHeight: string,
  menuFooterPaddingTop: string,
  menuFooterPaddingBottom: string,
) => {
  const paddingRight = menuFooterPaddingX;

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
