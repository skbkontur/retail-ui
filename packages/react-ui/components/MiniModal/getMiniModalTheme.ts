import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getMiniModalTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      modalBackdropFilter: theme.miniModalBackdropFilter,
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
