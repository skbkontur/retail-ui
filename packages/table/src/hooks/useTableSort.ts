import { useMemo, useCallback, useState, useEffect } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<TKey extends string = string> {
  key?: TKey;
  direction?: SortDirection;
}

export type EmptyPlacement = 'first' | 'last';

export interface UseTableSortOptions {
  /**
   * Куда помещать значения null/undefined или отсутствующее поле.
   * По умолчанию — в конец.
   */
  emptyPlacement?: EmptyPlacement;
  /**
   * Локаль для строковой сортировки (передается в Intl.Collator).
   * Если не указана, используется системная.
   */
  locale?: string | string[];
  /**
   * Дополнительные опции строковой сортировки (Intl.CollatorOptions).
   * По умолчанию включена базовая чувствительность и numeric: true.
   */
  localeOptions?: Intl.CollatorOptions;
}

type CompareFn<T> = (a: T, b: T) => number;

function createDefaultCompareFn<T extends Record<TKey, unknown>, TKey extends string>(
  sortConfig: SortConfig<TKey>,
  options: UseTableSortOptions
): CompareFn<T> {
  const emptyPlacement = options.emptyPlacement ?? 'last';
  const collator = new Intl.Collator(options.locale, {
    sensitivity: 'base',
    numeric: true,
    ...options.localeOptions,
  });

  const isEmpty = (value: unknown) => value === null || value === undefined;

  return (a: T, b: T) => {
    const key = sortConfig.key;
    if (!key) {
      return 0;
    }

    const direction = sortConfig.direction ?? 'asc';
    const aValue = a[key];
    const bValue = b[key];

    const aIsEmpty = isEmpty(aValue);
    const bIsEmpty = isEmpty(bValue);

    if (aIsEmpty && bIsEmpty) {
      return 0;
    }

    if (aIsEmpty) {
      return emptyPlacement === 'last' ? 1 : -1;
    }

    if (bIsEmpty) {
      return emptyPlacement === 'last' ? -1 : 1;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const result = collator.compare(aValue, bValue);
      return direction === 'asc' ? result : -result;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      const result = aValue - bValue;
      return direction === 'asc' ? result : -result;
    }

    const result = collator.compare(String(aValue), String(bValue));
    return direction === 'asc' ? result : -result;
  };
}

/**
 * Хук для управления сортировкой таблицы.
 * Поддерживает сортировку по строковым и числовым значениям.
 * Для сортировки по вложенным полям используйте кастомную compareFn.
 *
 * @template T - Тип строки таблицы (объект с произвольными ключами)
 * @param {T[]} rows - Массив строк таблицы для сортировки
 * @param {SortConfig} [initialConfig] - Начальная конфигурация сортировки.
 *   По умолчанию: `{ key: undefined, direction: 'asc' }` (без сортировки).
 *   Если `key` не указан, сортировка не применяется.
 * @param {(a: T, b: T, sortConfig: SortConfig) => number} [compareFn] - Кастомная функция сравнения.
 *   Если не передана, используется стандартная логика сортировки для строк и чисел.
 *   Функция принимает два элемента массива и текущую конфигурацию сортировки,
 *   возвращает число для сравнения (как стандартная compareFn для Array.sort):
 *   - отрицательное число, если `a` должен быть перед `b`
 *   - положительное число, если `a` должен быть после `b`
 *   - 0, если элементы равны
 * @param {UseTableSortOptions} [options] - Опции сортировки по умолчанию:
 *   - `emptyPlacement`: куда помещать `null`/`undefined` (по умолчанию — `'last'`)
 *   - `locale` и `localeOptions`: настройки `Intl.Collator` для строковой сортировки
 * @returns {Object} Объект с методами и данными сортировки:
 *   - `sortedRows` {T[]} - Отсортированный массив строк на основе текущей конфигурации.
 *     Если `sortConfig.key` не указан, возвращается исходный массив `rows`.
 *   - `sortConfig` {SortConfig} - Текущая конфигурация сортировки (ключ колонки и направление).
 *   - `handleSort` {(columnKey: string, direction: SortDirection) => void} - Функция для изменения конфигурации сортировки.
 *     Принимает ключ колонки и направление сортировки ('asc' | 'desc').
 *
 * @example
 * // Базовое использование
 * const { sortedRows, sortConfig, handleSort } = useTableSort(rows);
 *
 * // Сортировать по колонке "client" по возрастанию
 * handleSort('client', 'asc');
 *
 * // Сортировать по колонке "amount" по убыванию
 * handleSort('amount', 'desc');
 *
 * @example
 * // С начальной конфигурацией
 * const { sortedRows } = useTableSort(rows, { key: 'name', direction: 'desc' });
 *
 * @example
 * // С кастомной функцией сравнения
 * const customCompareFn = (a, b, sortConfig) => {
 *   // Кастомная логика сравнения с учетом направления сортировки
 *   const result = a.name.localeCompare(b.name, 'ru');
 *   return sortConfig.direction === 'asc' ? result : -result;
 * };
 * const { sortedRows } = useTableSort(rows, { key: 'name', direction: 'asc' }, customCompareFn);
 */
export function useTableSort<T extends Record<TKey, unknown>, TKey extends string = string>(
  rows: T[],
  initialConfig: SortConfig<TKey> = { key: undefined, direction: 'asc' },
  compareFn: ((a: T, b: T, sortConfig: SortConfig<TKey>) => number) | undefined = undefined,
  options: UseTableSortOptions = {}
): {
  readonly sortedRows: T[];
  readonly sortConfig: SortConfig<TKey>;
  readonly handleSort: (columnKey: TKey, direction: SortDirection) => void;
} {
  const [sortConfig, setSortConfig] = useState<SortConfig<TKey>>(initialConfig);

  const initialKey = initialConfig?.key;
  const initialDirection = initialConfig?.direction;

  useEffect(() => {
    setSortConfig((prev) => {
      if (prev.key === initialKey && prev.direction === initialDirection) {
        return prev;
      }
      return { key: initialKey, direction: initialDirection };
    });
  }, [initialKey, initialDirection]);

  const defaultCompareFn = useMemo(
    () => createDefaultCompareFn<T, TKey>(sortConfig, options),
    [sortConfig, options.emptyPlacement, options.locale, options.localeOptions]
  );

  const finalCompareFn = compareFn ?? defaultCompareFn;

  const sortedRows = useMemo(() => {
    if (!sortConfig.key) {
      return rows;
    }

    const result = [...rows];
    result.sort((a, b) => finalCompareFn(a, b, sortConfig));

    return result;
  }, [rows, sortConfig, finalCompareFn]);

  const handleSort = useCallback((columnKey: TKey, direction: SortDirection) => {
    setSortConfig({ key: columnKey, direction });
  }, []);

  return { sortedRows, sortConfig, handleSort } as const;
}
