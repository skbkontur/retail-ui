import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import type { Theme } from '../../lib/theming/Theme';
import type { ComboBoxViewMode } from '../../components/ComboBox';
import { themeTokens5_4 } from '../themes/consts';

export const getComboBoxTheme = (theme: Theme, viewMode?: ComboBoxViewMode): Theme => {
  return ThemeFactory.create(
    {
      menuOffsetY: theme.comboboxMenuOffsetY,
      ...(viewMode === 'multiline' || viewMode === 'multiline-editing' ? themeTokens5_4 : {}),
    },
    theme,
  );
};
