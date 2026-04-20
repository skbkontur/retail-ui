import type { BasicThemeClass } from '../../internal/themes/BasicTheme.js';
import type { Theme, ThemeIn } from '../../lib/theming/Theme.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';

export const getMiniModalTheme = (contextTheme: Theme, propsTheme: ThemeIn = {}): Readonly<typeof BasicThemeClass> => {
  const theme = ThemeFactory.create(propsTheme, contextTheme);
  return ThemeFactory.create(
    {
      modalBodyPaddingTop: theme.miniModalBodyPaddingTop,
      modalBodyPaddingBottom: theme.miniModalBodyPaddingBottom,
      modalHeaderPaddingTop: theme.miniModalHeaderPaddingTop,
      modalHeaderPaddingBottom: theme.miniModalHeaderPaddingBottom,
      modalFooterPaddingTop: theme.miniModalFooterPaddingTop,
      modalFooterPaddingBottom: theme.miniModalFooterPaddingBottom,
      mobileModalFooterPadding: theme.miniModalFooterPaddingMobile,
      mobileModalHeaderPadding: theme.miniModalHeaderPaddingMobile,
      mobileModalBodyPadding: theme.miniModalBodyPaddingMobile,
      mobileModalContainerHeight: theme.miniModalHeightMobile,
      mobileModalContainerMarginTop: theme.miniModalMarginTopMobile,
      mobileModalContainerMarginRight: theme.miniModalMarginRightMobile,
      mobileModalContainerMarginLeft: theme.miniModalMarginLeftMobile,
    },
    theme,
  );
};
