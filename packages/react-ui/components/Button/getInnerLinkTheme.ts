import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getInnerLinkTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      linkLineBorderBottomStyle: theme.btnLinkLineBorderBottomStyle,
      linkLineBorderBottomWidth: theme.btnLinkLineBorderBottomWidth,
      linkLineHoverBorderBottomColor: theme.btnLinkLineHoverBorderBottomColor,
      linkLineActiveBorderBottomColor: theme.btnLinkLineActiveBorderBottomColor,
      linkDisabledColor: theme.btnLinkDisabledColor,
    },
    theme,
  );
};
