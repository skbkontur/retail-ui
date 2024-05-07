import type { ValidationLevel } from '../ValidationWrapperInternal';

export function getValidationTextColor(theme: 'light' | 'dark', level: ValidationLevel = 'error') {
  switch (level) {
    case 'warning':
      return theme === 'light' ? '#ef8b17' : '#fdd481';
    case 'error':
      return theme === 'light' ? '#cb3d35' : '#ff887b';
  }
}
