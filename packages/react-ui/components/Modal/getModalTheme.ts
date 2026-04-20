import type { Theme, ThemeIn } from '../../lib/theming/Theme.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';

export const getModalTheme = (contextTheme: Theme, propsTheme: ThemeIn = {}): Theme => {
  const theme = ThemeFactory.create(propsTheme, contextTheme);
  return ThemeFactory.create(
    propsTheme as Theme,
    ThemeFactory.create(
      {
        loaderBorderRadius: theme.modalBorderRadius,
      },
      theme,
    ),
  );
};
