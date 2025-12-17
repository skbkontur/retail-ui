import { useMemo, useCallback, useRef, useState, useEffect } from 'react';

import type { ITableFilterToken } from '../components/Table/FilterResult/AppliedFilters.js';

/**
 * Конфигурация фильтра колонки.
 * - key: уникальный ключ колонки (используется в состоянии фильтров)
 * - accessor: функция для получения сырых данных строки (по умолчанию row[key])
 * - stringify: функция превращает значение в строку для опций фильтра
 * - filterPredicate: опциональный предикат (row, selectedValues) => boolean
 * - label: опциональная подпись колонки (в токенах фильтров, по умолчанию key)
 * - formatTokenCaption: опциональный форматер подписи токена (columnKey, columnLabel, stringifiedValue) => string
 */
export interface ColumnFilterConfig<T, K extends string> {
  key: K;
  accessor?: (row: T) => T[keyof T];
  stringify?: (value: unknown) => string;
  filterPredicate?: (row: T, selectedValues?: string[]) => boolean;
  label?: string;
  formatTokenCaption?: (columnKey: K, columnLabel: string, stringifiedValue: string) => string;
}

export type FiltersState<K extends string = string> = Map<K, string[]>;

type FilterValue = string[];

const isFilterEmpty = (value: FilterValue | undefined) => !value || value.length === 0;

/**
 * Универсальный хук для управления фильтрацией таблицы по произвольным колонкам.
 * Позволяет настроить фильтрацию для любой структуры таблицы через конфигурацию колонок.
 * Поддерживает кастомные функции доступа к данным, преобразования значений и предикаты фильтрации.
 *
 * @template T - Тип строки таблицы
 * @template K - Тип ключа колонки (строка)
 * @param rows - Массив строк таблицы для фильтрации
 * @param columns - Конфигурация колонок для фильтрации.
 *   Каждая конфигурация содержит:
 *   - `key` - уникальный ключ колонки
 *   - `accessor` - функция для извлечения значения из строки (по умолчанию: row[key])
 *   - `stringify` - функция для преобразования значения в строку (по умолчанию: String(value))
 *   - `filterPredicate` - опциональная кастомная функция фильтрации
 *   - `label` - опциональное кастомное название колонки для отображения в токенах фильтров (по умолчанию: key)
 *   - `formatTokenCaption` - опциональная функция для кастомного форматирования строки токена (columnKey, columnLabel, stringifiedValue) => string
 * @returns Объект с методами и данными фильтрации:
 *   - `filters` - Map с текущим состоянием фильтров (ключ - ключ колонки, значение - выбранные значения)
 *   - `setFilters` - Функция для прямого изменения состояния всех фильтров
 *   - `setFilter` - Функция для установки фильтра для конкретной колонки
 *   - `resetFilters` - Функция для сброса всех фильтров
 *   - `uniqueValues` - Объект с уникальными значениями для каждой колонки (отсортированные)
 *   - `filteredRows` - Отфильтрованный массив строк на основе текущих фильтров
 *   - `convertFiltersToTokens` - Функция для преобразования активных фильтров в токены для UI
 *
 * @example
 * const columns = [
 *   { key: 'client', accessor: r => r.client, label: 'Клиент' },
 *   {
 *     key: 'amount',
 *     accessor: r => r.amount,
 *     stringify: v => v.toLocaleString('ru-RU'),
 *     label: 'Сумма',
 *     formatTokenCaption: (key, label, value) => `${label}: ${value} ₽`
 *   }
 * ];
 * const { filters, setFilter, uniqueValues, filteredRows } = useTableFilters(rows, columns);
 *
 * // Установить фильтр для колонки
 * setFilter('client', ['Client 1', 'Client 2']);
 */
export function useTableFilters<T, K extends string>(rows: T[], columns: Array<ColumnFilterConfig<T, K>>) {
  const buildEmptyFilters = useCallback((): FiltersState<K> => {
    const map = new Map<K, string[]>();
    columns.forEach((column) => map.set(column.key, []));
    return map;
  }, [columns]);

  const [filters, setFilters] = useState<FiltersState<K>>(() => buildEmptyFilters());

  const columnKeys = useMemo(() => columns.map((column) => column.key), [columns]);

  useEffect(() => {
    setFilters((prev) => {
      const hasSameKeys = prev.size === columnKeys.length && columnKeys.every((key) => prev.has(key));
      if (hasSameKeys) {
        return prev;
      }

      const next = new Map<K, string[]>();
      columnKeys.forEach((key) => {
        next.set(key, prev.get(key) ?? []);
      });

      return next;
    });
  }, [columnKeys]);

  const stringify = useCallback((col: ColumnFilterConfig<T, K>, value: any) => {
    if (typeof col.stringify === 'function') {
      return col.stringify(value);
    }
    if (value === null || value === undefined) {
      return '';
    }
    return String(value);
  }, []);

  const getRawValue = useCallback(
    (row: T, col: ColumnFilterConfig<T, K>) =>
      col.accessor ? col.accessor(row) : (row as Record<string, unknown>)[col.key],
    []
  );

  const uniqueValuesCache = useRef<{
    rows: T[];
    columns: Array<ColumnFilterConfig<T, K>>;
    result: Record<K, string[]>;
  }>();

  const uniqueValues = useMemo(() => {
    const cached = uniqueValuesCache.current;
    if (cached && cached.rows === rows && cached.columns === columns) {
      return cached.result;
    }

    const map = {} as Record<K, string[]>;
    columns.forEach((col) => {
      const set = new Set<string>();
      rows.forEach((row) => {
        const raw = getRawValue(row, col);
        const s = stringify(col, raw);
        if (s !== '') {
          set.add(s);
        }
      });
      map[col.key] = Array.from(set).sort();
    });

    const result = map as Record<K, string[]>;
    uniqueValuesCache.current = { rows, columns, result };

    return result;
  }, [rows, columns, stringify, getRawValue]);

  const filteredRows = useMemo(() => {
    if (columns.length === 0) {
      return rows;
    }
    const matchesColumnFilter = (row: T, col: ColumnFilterConfig<T, K>) => {
      const selected = filters.get(col.key);
      if (isFilterEmpty(selected)) {
        return true;
      }
      if (typeof col.filterPredicate === 'function') {
        return col.filterPredicate(row, selected);
      }
      const raw = getRawValue(row, col);
      if (selected) {
        const s = stringify(col, raw);
        return selected.includes(s);
      }
      return raw === selected;
    };

    return rows.filter((row) => columns.every((col) => matchesColumnFilter(row, col)));
  }, [rows, columns, filters, stringify, getRawValue]);

  const setFilter = useCallback((key: K, value: string[]) => {
    setFilters((prev: FiltersState<K>) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(buildEmptyFilters());
  }, [buildEmptyFilters]);

  const columnsByKey = useMemo(() => new Map(columns.map((col) => [col.key, col])), [columns]);

  /**
   * Преобразует текущие фильтры в массив токенов для отображения в UI.
   * Каждый активный фильтр создает токен с возможностью удаления.
   *
   * @returns Массив токенов ITableFilterToken для отображения примененных фильтров
   */
  const convertFiltersToTokens = useCallback((): ITableFilterToken[] => {
    const tokens: ITableFilterToken[] = [];

    filters.forEach((rawFilterValue, columnKey) => {
      const filterValue = rawFilterValue as FilterValue;
      if (isFilterEmpty(filterValue)) {
        return;
      }

      const column = columnsByKey.get(columnKey as K);
      if (!column) {
        return;
      }

      const columnLabel = column.label || column.key;

      const formatCaption = (value: string): string => {
        if (typeof column.formatTokenCaption === 'function') {
          return column.formatTokenCaption(columnKey as K, columnLabel, value);
        }
        return `${columnLabel}: ${value}`;
      };

      const values = Array.isArray(filterValue) ? filterValue : [filterValue];
      values.forEach((value, index) => {
        const stringifiedValue = stringify(column, value);
        if (!stringifiedValue) {
          return;
        }
        const isArrayValue = Array.isArray(filterValue);
        tokens.push({
          key: isArrayValue ? `${columnKey}-${index}` : (columnKey as string),
          caption: formatCaption(stringifiedValue),
          onRemove: () => {
            if (isArrayValue) {
              const newFilterValue = values.filter((_, i) => i !== index);
              setFilter(columnKey as K, newFilterValue);
              return;
            }
            setFilter(columnKey as K, []);
          },
        });
      });
    });

    return tokens;
  }, [filters, columnsByKey, stringify, setFilter]);

  return {
    filters,
    setFilters,
    setFilter,
    resetFilters,
    uniqueValues,
    filteredRows,
    convertFiltersToTokens,
  } as const;
}
