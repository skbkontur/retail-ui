import type { SizeProp } from '@skbkontur/react-ui/lib/types/props';

const capitalizeSize = (size: SizeProp): string => `${size.charAt(0).toUpperCase()}${size.slice(1)}`;

/**
 * Генерирует модификатор класса для размеров, чтобы не перечислять small/medium/large вручную.
 *
 * @param classPrefix Базовый префикс CSS-класса
 * @param size Размер ('small', 'medium', 'large'), по умолчанию 'small'
 *
 * @returns Полное имя модификатора в формате `${classPrefix}${CapitalizedSize}`
 *
 * @example
 * // Возвращает 'TableFilterComponentSearchSmall'
 * getSizeModifier('TableFilterComponentSearch', 'small')
 *
 * @example
 * // Возвращает 'TableFilterComponentSearchMedium' (размер по умолчанию)
 * getSizeModifier('TableFilterComponentSearch')
 *
 * @example
 * // Использование с CSS Modules и утилитой cx()
 * className={cx(
 *   styles.TableFilterComponentSearch,
 *   styles[getSizeModifier('TableFilterComponentSearch', size)]
 * )}
 */
export const getSizeModifier = (classPrefix: string, size: SizeProp = 'small'): string => {
  return `${classPrefix}${capitalizeSize(size)}`;
};
