import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const relinkModalTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      loaderBorderRadius: theme.modalBorderRadius,
    },
    theme,
  );
};
