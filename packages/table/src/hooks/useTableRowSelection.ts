import type { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { useMemo, useEffect, useCallback, useRef, useState } from 'react';
import { type SyntheticEvent } from 'react';

interface RowLike {
  id: string | number;
}

export interface UseTableRowSelectionOptions<Id extends RowLike['id'] = RowLike['id']> {
  /**
   * Начально выбранные строки (устанавливаются при монтировании или изменении пропа)
   */
  initialCheckedRows?: Set<Id>;
}

/**
 * Хук для управления выбором строк в таблице.
 * Предоставляет функциональность для выбора/снятия выбора отдельных строк и всех строк,
 * а также автоматически управляет состоянием indeterminate для чекбокса "Выбрать все".
 *
 * @template T - Тип строки таблицы, должен содержать поле `id: string | number`
 * @param {T[]} rows - Массив строк таблицы
 * @param {UseTableRowSelectionOptions} options - Опции для управления выбором строк
 * @returns {Object} Объект с методами и состоянием выбора:
 *   - `checkedRows` - Set с ID выбранных строк
 *   - `setCheckedRows` - Функция для прямого изменения состояния выбранных строк
 *   - `isCheckedAll` - Флаг, указывающий, выбраны ли все строки
 *   - `hasChecked` - Флаг, указывающий, есть ли хотя бы одна выбранная строка
 *   - `checkboxRef` - Ref для чекбокса "Выбрать все" (для управления indeterminate состоянием)
 *   - `selectAll` - Функция для выбора/снятия выбора всех строк
 *   - `toggleRow` - Функция для переключения выбора конкретной строки
 *   - `isRowChecked` - Функция для проверки, выбрана ли конкретная строка
 *
 * @example
 * const { checkedRows, selectAll, toggleRow, isRowChecked } = useTableRowSelection(rows, {
 *   initialCheckedRows: new Set([1, 2])
 * });
 */
export function useTableRowSelection<T extends RowLike>(
  rows: T[],
  options?: UseTableRowSelectionOptions<T['id']>
): {
  readonly checkedRows: Set<T['id']>;
  readonly setCheckedRows: React.Dispatch<React.SetStateAction<Set<T['id']>>>;
  readonly isCheckedAll: boolean;
  readonly hasChecked: boolean;
  readonly checkboxRef: React.RefObject<Checkbox>;
  readonly selectAll: () => void;
  readonly toggleRow: (e: SyntheticEvent<HTMLElement> | undefined, rowId: T['id']) => void;
  readonly isRowChecked: (rowId: number) => boolean;
} {
  const initialCheckedRows = options?.initialCheckedRows;
  const [checkedRows, setCheckedRows] = useState<Set<T['id']>>(() =>
    initialCheckedRows ? new Set(initialCheckedRows) : new Set()
  );
  const initialCheckedRowsRef = useRef<Set<T['id']> | undefined>(
    initialCheckedRows ? new Set(initialCheckedRows) : undefined
  );

  const areSetsEqual = useCallback((a: Set<T['id']>, b: Set<T['id']>) => {
    if (a.size !== b.size) {
      return false;
    }
    for (const value of a) {
      if (!b.has(value)) {
        return false;
      }
    }
    return true;
  }, []);

  const checkedRowsRef = useRef<Set<T['id']>>(checkedRows);

  useEffect(() => {
    checkedRowsRef.current = checkedRows;
  }, [checkedRows]);

  useEffect(() => {
    if (!initialCheckedRows) {
      initialCheckedRowsRef.current = undefined;
      return;
    }

    const next = new Set(initialCheckedRows);
    const initialChanged = !initialCheckedRowsRef.current || !areSetsEqual(initialCheckedRowsRef.current, next);

    if (!initialChanged) {
      return;
    }

    initialCheckedRowsRef.current = next;
    setCheckedRows((prev) => (areSetsEqual(prev, next) ? prev : next));
  }, [initialCheckedRows, areSetsEqual]);

  const prevRowsRef = useRef<T[]>(rows);
  useEffect(() => {
    const prevRows = prevRowsRef.current;
    const prevRowIds = new Set(prevRows.map((r) => r.id));
    const currentRowIds = new Set(rows.map((r) => r.id));

    const rowsChanged =
      prevRows.length !== rows.length ||
      prevRows.some((prevRow) => !currentRowIds.has(prevRow.id)) ||
      rows.some((row) => !prevRowIds.has(row.id));

    if (rowsChanged && checkedRowsRef.current.size > 0) {
      setCheckedRows(new Set<T['id']>());
    }

    prevRowsRef.current = rows;
  }, [rows]);

  const isCheckedAll = useMemo(() => rows.length > 0 && checkedRows.size === rows.length, [checkedRows, rows]);
  const hasChecked = useMemo(() => checkedRows.size > 0, [checkedRows]);

  const checkboxRef = useRef<Checkbox>(null);

  useEffect(() => {
    const instance = checkboxRef.current;
    if (!instance) {
      return;
    }

    if (!isCheckedAll && hasChecked) {
      if (typeof instance.setIndeterminate === 'function') {
        instance.setIndeterminate();
      }
    } else if (typeof instance.resetIndeterminate === 'function') {
      instance.resetIndeterminate();
    }
  }, [isCheckedAll, hasChecked, rows.length]);

  const selectAll = useCallback(() => {
    setCheckedRows((prev) => {
      if (prev.size === rows.length) {
        return new Set<T['id']>();
      }
      return new Set(rows.map((r) => r.id));
    });
  }, [rows, setCheckedRows]);

  const toggleRow = useCallback(
    (e: SyntheticEvent<HTMLElement> | undefined, rowId: T['id']) => {
      if (e) {
        e.stopPropagation();
      }
      setCheckedRows((prev) => {
        const next = new Set(prev);
        if (next.has(rowId)) {
          next.delete(rowId);
        } else {
          next.add(rowId);
        }
        return next;
      });
    },
    [setCheckedRows]
  );

  const isRowChecked = useCallback((rowId: T['id']) => checkedRows.has(rowId), [checkedRows]);

  return {
    checkedRows,
    setCheckedRows,
    isCheckedAll,
    hasChecked,
    checkboxRef,
    selectAll,
    toggleRow,
    isRowChecked,
  } as const;
}
