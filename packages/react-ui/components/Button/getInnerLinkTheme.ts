import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';

export const getInnerLinkTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      linkTextDecorationStyle: theme.btnLinkTextDecorationStyle,
      linkTextUnderlineOffset: theme.btnLinkTextUnderlineOffset,
      linkHoverTextDecorationStyle: theme.btnLinkHoverTextDecorationStyle,
      linkTextUnderlineOpacity: theme.btnLinkTextUnderlineOpacity,
      linkTextDecorationColor: theme.btnLinkTextDecorationColor,
      linkTextDecorationThickness: theme.btnLinkTextDecorationThickness,
      linkDisabledColor: theme.btnLinkDisabledColor,
      linkColor: theme.btnLinkColor,
      linkHoverColor: theme.btnLinkHoverColor,
      linkActiveColor: theme.btnLinkActiveColor,
      linkHoverTextDecoration: theme.btnLinkHoverTextDecoration,
      linkIconMarginRight: theme.btnLinkIconMarginRight,
    },
    theme,
  );
};
