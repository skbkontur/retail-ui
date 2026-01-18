import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getModalBodyTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      loaderBorderRadius: theme.modalBodyBorderRadius,
    },
    theme,
  );
};
