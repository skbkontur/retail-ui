import type { ValidationLevel } from '../ValidationWrapperInternal';
import type { ThemeValidations } from '../../typings/theme-context';

export const DEFAULT_TEXT_COLOR = '#d43517';

export function getValidationTextColor(theme: ThemeValidations, level: ValidationLevel = 'error') {
  return (
    (level === 'warning' ? theme.validationsTextColorWarning : theme.validationsTextColorError) || DEFAULT_TEXT_COLOR
  );
}
