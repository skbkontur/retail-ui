import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const getModalBodyTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      loaderBorderRadius: theme.modalBodyBorderRadius,
    },
    theme,
  );
};
