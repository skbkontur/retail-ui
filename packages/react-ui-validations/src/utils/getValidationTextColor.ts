import type { ValidationLevel } from '../ValidationWrapperInternal';
import type { ThemeValidations } from '../../typings/theme-context';

import { ValidationsFeatureFlags } from './featureFlagsContext';

export const DEFAULT_TEXT_COLOR = '#d43517';

export function getValidationTextColor(
  flags: ValidationsFeatureFlags,
  theme: ThemeValidations,
  level: ValidationLevel = 'error',
) {
  if (flags.fixedValidationTextColors) {
    if (!theme.validationsTextColorWarning && !theme.validationsTextColorError) {
      switch (level) {
        case 'warning':
          return flags.darkTheme ? '#fdd481' : '#ef8b17';
        case 'error':
          return flags.darkTheme ? '#ff887b' : '#cb3d35';
      }
    }
    return (
      (level === 'warning' ? theme.validationsTextColorWarning : theme.validationsTextColorError) || DEFAULT_TEXT_COLOR
    );
  }
  return DEFAULT_TEXT_COLOR;
}
