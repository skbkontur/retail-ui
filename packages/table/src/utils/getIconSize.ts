import type { SizeProp } from '@skbkontur/react-ui/lib/types/props';

/**
 * Возвращает размер иконки на основе размера таблицы.
 *
 * @param size Размер таблицы ('small', 'medium', 'large')
 * @returns Размер иконки: 16 для small, 20 для medium, 24 для large
 *
 * @example
 * const iconSize = getIconSize('small'); // возвращает 16
 * const iconSize = getIconSize('medium'); // возвращает 20
 * const iconSize = getIconSize('large'); // возвращает 24
 */
export const getIconSize = (size: SizeProp): 16 | 20 | 24 => {
  if (size === 'small') {
    return 16;
  }
  if (size === 'medium') {
    return 20;
  }
  return 24;
};
