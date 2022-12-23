import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { Theme } from '../../lib/theming/Theme';

export const relinkSelectTheme = (theme: Theme): Theme => {
  return ThemeFactory.create(
    {
      menuOffsetY: theme.selectMenuOffsetY,
    },
    theme,
  );
};
