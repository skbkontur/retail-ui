import type { ValidationLevel } from '../ValidationWrapperInternal';

export function getValidationTextColor(darkTheme = false, level: ValidationLevel = 'error') {
  switch (level) {
    case 'warning':
      return darkTheme ? '#fdd481' : '#ef8b17';
    case 'error':
      return darkTheme ? '#ff887b' : '#cb3d35';
  }
}
