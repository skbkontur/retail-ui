import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getInnerLinkTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      linkLineBorderBottomStyle: theme.btnLinkLineBorderBottomStyle,
      linkLineHoverBorderBottomStyle: theme.btnLinkHoverLineBorderBottomStyle,
      linkLineBorderBottomOpacity: theme.btnLinkLineBorderBottomOpacity,
      linkLineBorderBottomWidth: theme.btnLinkLineBorderBottomWidth,
      linkDisabledColor: theme.btnLinkDisabledColor,
    },
    theme,
  );
};
