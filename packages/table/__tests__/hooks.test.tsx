import { describe, test, expect, vi } from 'vitest';
import * as React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useTableSort, useTableRowSelection, useTableFilters, SortConfig, ColumnFilterConfig } from '../src/hooks';

describe('useTableSort', () => {
  const testData = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 20 },
  ];

  test('renders hook', () => {
    const { result } = renderHook(() => useTableSort(testData));
    expect(result.current).toBeDefined();
  });

  test('returns unsorted data by default', () => {
    const { result } = renderHook(() => useTableSort(testData));
    expect(result.current.sortedRows).toEqual(testData);
    expect(result.current.sortConfig.key).toBeUndefined();
  });

  test('sorts string column ascending', () => {
    const { result } = renderHook(() => useTableSort(testData));

    act(() => {
      result.current.handleSort('name', 'asc');
    });

    expect(result.current.sortedRows[0].name).toBe('Alice');
    expect(result.current.sortedRows[1].name).toBe('Bob');
    expect(result.current.sortedRows[2].name).toBe('Charlie');
    expect(result.current.sortConfig).toEqual({ key: 'name', direction: 'asc' });
  });

  test('sorts string column descending', () => {
    const { result } = renderHook(() => useTableSort(testData));

    act(() => {
      result.current.handleSort('name', 'desc');
    });

    expect(result.current.sortedRows[0].name).toBe('Charlie');
    expect(result.current.sortedRows[1].name).toBe('Bob');
    expect(result.current.sortedRows[2].name).toBe('Alice');
    expect(result.current.sortConfig).toEqual({ key: 'name', direction: 'desc' });
  });

  test('sorts strings case-insensitively by default', () => {
    const data = [
      { id: 1, name: 'beta' },
      { id: 2, name: 'Alpha' },
      { id: 3, name: 'alpha' },
    ];

    const { result } = renderHook(() => useTableSort(data));

    act(() => {
      result.current.handleSort('name', 'asc');
    });

    expect(result.current.sortedRows.map((row) => row.name)).toEqual(['Alpha', 'alpha', 'beta']);
  });

  test('sorts number column ascending', () => {
    const { result } = renderHook(() => useTableSort(testData));

    act(() => {
      result.current.handleSort('age', 'asc');
    });

    expect(result.current.sortedRows[0].age).toBe(20);
    expect(result.current.sortedRows[1].age).toBe(25);
    expect(result.current.sortedRows[2].age).toBe(30);
  });

  test('sorts number column descending', () => {
    const { result } = renderHook(() => useTableSort(testData));

    act(() => {
      result.current.handleSort('age', 'desc');
    });

    expect(result.current.sortedRows[0].age).toBe(30);
    expect(result.current.sortedRows[1].age).toBe(25);
    expect(result.current.sortedRows[2].age).toBe(20);
  });

  test('sorts numeric strings using locale-aware compare', () => {
    const dataWithNumericStrings = [
      { id: 1, code: '10' },
      { id: 2, code: '2' },
      { id: 3, code: '1' },
    ];

    const { result } = renderHook(() => useTableSort(dataWithNumericStrings));

    act(() => {
      result.current.handleSort('code', 'asc');
    });

    expect(result.current.sortedRows.map((row) => row.code)).toEqual(['1', '2', '10']);
  });

  test('handles nested fields with custom compareFn', () => {
    const dataWithResponsible = [
      { id: 1, responsible: { name: 'Zoe' } },
      { id: 2, responsible: { name: 'Alice' } },
      { id: 3, responsible: { name: 'Bob' } },
    ];

    const compareFn = (a: (typeof dataWithResponsible)[0], b: (typeof dataWithResponsible)[0]) => {
      const aName = a.responsible?.name || '';
      const bName = b.responsible?.name || '';
      return aName.localeCompare(bName);
    };

    const { result } = renderHook(() =>
      useTableSort(dataWithResponsible, { key: undefined, direction: 'asc' }, compareFn)
    );

    act(() => {
      result.current.handleSort('responsible', 'asc');
    });

    expect(result.current.sortedRows[0].responsible.name).toBe('Alice');
    expect(result.current.sortedRows[1].responsible.name).toBe('Bob');
    expect(result.current.sortedRows[2].responsible.name).toBe('Zoe');
  });

  test('keeps order when key is empty', () => {
    const { result } = renderHook(() => useTableSort(testData, { key: undefined, direction: 'asc' }));
    expect(result.current.sortedRows).toEqual(testData);
  });

  test('syncs sortConfig when initialConfig changes', () => {
    const initialProps: { config: SortConfig<string> } = {
      config: { key: 'name', direction: 'asc' },
    };

    const { result, rerender } = renderHook(({ config }) => useTableSort(testData, config), {
      initialProps,
    });

    expect(result.current.sortConfig).toEqual({ key: 'name', direction: 'asc' });

    rerender({ config: { key: 'age', direction: 'desc' } });

    expect(result.current.sortConfig).toEqual({ key: 'age', direction: 'desc' });
    expect(result.current.sortedRows.map((row) => row.age)).toEqual([30, 25, 20]);
  });

  test('updates config on repeated handleSort', () => {
    const { result } = renderHook(() => useTableSort(testData));

    act(() => {
      result.current.handleSort('name', 'asc');
    });
    expect(result.current.sortConfig).toEqual({ key: 'name', direction: 'asc' });

    act(() => {
      result.current.handleSort('name', 'desc');
    });
    expect(result.current.sortConfig).toEqual({ key: 'name', direction: 'desc' });
    expect(result.current.sortedRows[0].name).toBe('Charlie');
  });

  test('uses custom compareFn with sortConfig', () => {
    const compareFn = vi.fn((a, b, sortConfig) => {
      return sortConfig.direction === 'asc' ? a.age - b.age : b.age - a.age;
    });

    const { result } = renderHook(() => useTableSort(testData, { key: 'age', direction: 'asc' }, compareFn));

    act(() => {
      result.current.handleSort('age', 'asc');
    });
    expect(compareFn).toHaveBeenCalled();
    expect(result.current.sortedRows[0].age).toBe(20);
  });

  test('places null and undefined values last by default', () => {
    const dataWithNulls = [
      { id: 1, value: null as any },
      { id: 2, value: undefined as any },
      { id: 3, value: 5 },
    ];
    const { result } = renderHook(() => useTableSort(dataWithNulls));

    act(() => {
      result.current.handleSort('value', 'asc');
    });

    expect(result.current.sortedRows.map((r) => r.id)).toEqual([3, 1, 2]);
  });

  test('can place empty values first via options', () => {
    const dataWithNulls = [
      { id: 1, value: null as any },
      { id: 2, value: undefined as any },
      { id: 3, value: 5 },
    ];

    const { result } = renderHook(() =>
      useTableSort(dataWithNulls, { key: undefined, direction: 'asc' }, undefined, { emptyPlacement: 'first' })
    );

    act(() => {
      result.current.handleSort('value', 'asc');
    });

    expect(result.current.sortedRows.map((r) => r.id)).toEqual([1, 2, 3]);
  });

  test('places rows without a field according to emptyPlacement', () => {
    const dataWithMissingField = [{ id: 1, name: 'Bob' }, { id: 2 } as any, { id: 3, name: 'Alice' }];

    const { result } = renderHook(() => useTableSort(dataWithMissingField));

    act(() => {
      result.current.handleSort('name', 'asc');
    });

    expect(result.current.sortedRows.map((r) => r.id)).toEqual([3, 1, 2]);
  });

  test('passes locale and options to Intl.Collator', () => {
    const originalCollator = Intl.Collator;
    const calls: { locale: any; opts: Intl.CollatorOptions | undefined }[] = [];
    const collatorSpy = vi.spyOn(Intl, 'Collator').mockImplementation((locale, opts) => {
      calls.push({ locale, opts });
      return new originalCollator(locale as any, opts as any);
    });

    try {
      const data = [
        { id: 1, name: 'b' },
        { id: 2, name: 'a' },
      ];

      const { result } = renderHook(() =>
        useTableSort(data, { key: 'name', direction: 'asc' }, undefined, {
          locale: ['ru', 'en'],
          localeOptions: { sensitivity: 'variant', numeric: false },
        })
      );

      act(() => {
        result.current.handleSort('name', 'asc');
      });

      expect(calls.length).toBeGreaterThan(0);
      const lastCall = calls[calls.length - 1];
      expect(lastCall.locale).toEqual(['ru', 'en']);
      expect(lastCall.opts).toEqual({ sensitivity: 'variant', numeric: false });
      // ensure stubbed collator compare was used
      expect(result.current.sortedRows.map((r) => r.name)).toEqual(['a', 'b']);
    } finally {
      collatorSpy.mockRestore();
    }
  });

  test.each([null, undefined])('should handle null/undefined key in handleSort when %s passed', (testValue) => {
    const { result } = renderHook(() => useTableSort(testData));

    act(() => {
      result.current.handleSort(testValue as any, 'asc');
    });

    expect(result.current.sortedRows).toEqual(testData);
    expect(result.current.sortConfig.key).toBe(testValue);
  });

  test.each([null, undefined])('should handle null/undefined direction in handleSort when %s passed', (testValue) => {
    const { result } = renderHook(() => useTableSort(testData));

    act(() => {
      result.current.handleSort('name', testValue as any);
    });

    expect(result.current.sortedRows).toEqual(testData);
    expect(result.current.sortConfig.direction).toBe(testValue);
  });

  test('should handle null key in initialConfig', () => {
    const { result } = renderHook(() => useTableSort(testData, { key: null as any, direction: 'asc' }));

    expect(result.current.sortedRows).toEqual(testData);
    expect(result.current.sortConfig.key).toBe(null);
  });

  test('should handle undefined key in initialConfig', () => {
    const { result } = renderHook(() => useTableSort(testData, { key: undefined, direction: 'asc' }));

    expect(result.current.sortedRows).toEqual(testData);
    expect(result.current.sortConfig.key).toBeUndefined();
  });

  test('should handle null direction in initialConfig', () => {
    const { result } = renderHook(() => useTableSort(testData, { key: 'name', direction: null as any }));

    expect(result.current.sortedRows).toEqual(testData);
    expect(result.current.sortConfig.direction).toBe(null);
  });

  test('should handle undefined direction in initialConfig', () => {
    const { result } = renderHook(() => useTableSort(testData, { key: 'name', direction: undefined }));

    expect(result.current.sortedRows).toEqual(testData);
    expect(result.current.sortConfig.direction).toBeUndefined();
  });
});

describe('useTableRowSelection', () => {
  const testData = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];

  test('renders hook', () => {
    const { result } = renderHook(() => useTableRowSelection(testData));
    expect(result.current).toBeDefined();
  });

  test('no rows selected initially', () => {
    const { result } = renderHook(() => useTableRowSelection(testData));
    expect(result.current.checkedRows.size).toBe(0);
    expect(result.current.isCheckedAll).toBe(false);
    expect(result.current.hasChecked).toBe(false);
  });

  test('selects all rows', () => {
    const { result } = renderHook(() => useTableRowSelection(testData));

    act(() => {
      result.current.selectAll();
    });

    expect(result.current.checkedRows.size).toBe(3);
    expect(result.current.isCheckedAll).toBe(true);
    expect(result.current.hasChecked).toBe(true);
    expect(result.current.isRowChecked(1)).toBe(true);
    expect(result.current.isRowChecked(2)).toBe(true);
    expect(result.current.isRowChecked(3)).toBe(true);
  });

  test('unselects all when already selected', () => {
    const { result } = renderHook(() => useTableRowSelection(testData));

    act(() => {
      result.current.selectAll();
    });

    act(() => {
      result.current.selectAll();
    });

    expect(result.current.checkedRows.size).toBe(0);
    expect(result.current.isCheckedAll).toBe(false);
    expect(result.current.hasChecked).toBe(false);
  });

  test('toggles single row', () => {
    const { result } = renderHook(() => useTableRowSelection(testData));

    act(() => {
      result.current.toggleRow(undefined, 1);
    });

    expect(result.current.checkedRows.size).toBe(1);
    expect(result.current.isRowChecked(1)).toBe(true);
    expect(result.current.isRowChecked(2)).toBe(false);
    expect(result.current.hasChecked).toBe(true);
    expect(result.current.isCheckedAll).toBe(false);
  });

  test('supports string ids', () => {
    const guidData = [
      { id: '8c4f4ff7-66ef-4c39-b3eb-cc9029a91f91', name: 'Alice' },
      { id: 'd25108f3-4799-43c2-809a-051b72f95f2d', name: 'Bob' },
    ];
    const { result } = renderHook(() => useTableRowSelection(guidData));

    act(() => {
      result.current.toggleRow(undefined, guidData[0].id);
    });

    expect(result.current.checkedRows.size).toBe(1);
    expect(result.current.isRowChecked(guidData[0].id)).toBe(true);
    expect(result.current.isRowChecked(guidData[1].id)).toBe(false);
  });

  test('unselects row when already checked', () => {
    const { result } = renderHook(() => useTableRowSelection(testData));

    act(() => {
      result.current.toggleRow(undefined, 1);
    });

    act(() => {
      result.current.toggleRow(undefined, 1);
    });

    expect(result.current.checkedRows.size).toBe(0);
    expect(result.current.isRowChecked(1)).toBe(false);
    expect(result.current.hasChecked).toBe(false);
  });

  test('stops event propagation when event is provided', () => {
    const { result } = renderHook(() => useTableRowSelection(testData));
    const mockEvent = {
      stopPropagation: vi.fn(),
    } as any;

    act(() => {
      result.current.toggleRow(mockEvent, 1);
    });

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  test('partial selection updates flags', () => {
    const { result } = renderHook(() => useTableRowSelection(testData));

    act(() => {
      result.current.toggleRow(undefined, 1);
      result.current.toggleRow(undefined, 2);
    });

    expect(result.current.hasChecked).toBe(true);
    expect(result.current.isCheckedAll).toBe(false);
  });

  test('recomputes isCheckedAll when rows change', () => {
    const { result, rerender } = renderHook(({ rows }) => useTableRowSelection(rows), {
      initialProps: { rows: testData },
    });

    act(() => {
      result.current.selectAll();
    });
    expect(result.current.isCheckedAll).toBe(true);

    rerender({ rows: testData.slice(0, 2) });
    expect(result.current.isCheckedAll).toBe(false);
  });

  test('clears checked rows when rows change', () => {
    const { result, rerender } = renderHook(({ rows }) => useTableRowSelection(rows), {
      initialProps: { rows: testData },
    });

    act(() => {
      result.current.toggleRow(undefined, 1);
    });
    expect(result.current.checkedRows.size).toBe(1);

    rerender({ rows: testData.slice(1) });

    expect(result.current.checkedRows.size).toBe(0);
    expect(result.current.hasChecked).toBe(false);
  });

  test('applies initialCheckedRows', () => {
    const initialCheckedRows = new Set<number>([1, 3]);
    const { result } = renderHook(() => useTableRowSelection(testData, { initialCheckedRows }));

    expect(result.current.checkedRows.size).toBe(2);
    expect(result.current.isRowChecked(1)).toBe(true);
    expect(result.current.isRowChecked(3)).toBe(true);
  });

  test('updates selection when initialCheckedRows changes', () => {
    const { result, rerender } = renderHook(
      ({ initialCheckedRows }) => useTableRowSelection(testData, { initialCheckedRows }),
      { initialProps: { initialCheckedRows: new Set<number>([1]) } }
    );

    expect(result.current.isRowChecked(1)).toBe(true);
    expect(result.current.isRowChecked(2)).toBe(false);

    const nextInitial = new Set<number>([2]);
    rerender({ initialCheckedRows: nextInitial });

    expect(result.current.isRowChecked(1)).toBe(false);
    expect(result.current.isRowChecked(2)).toBe(true);
  });

  test('allows updating selection when initialCheckedRows provided', () => {
    const { result } = renderHook(() => useTableRowSelection(testData, { initialCheckedRows: new Set<number>([1]) }));

    expect(result.current.isRowChecked(1)).toBe(true);

    act(() => {
      result.current.toggleRow(undefined, 2);
    });

    expect(result.current.checkedRows.size).toBe(2);
    expect(result.current.isRowChecked(2)).toBe(true);

    act(() => {
      result.current.toggleRow(undefined, 1);
    });

    expect(result.current.checkedRows.size).toBe(1);
    expect(result.current.isRowChecked(1)).toBe(false);
  });
});

describe('useTableFilters', () => {
  const testData = [
    { id: 1, name: 'Alice', age: 25, city: 'Moscow' },
    { id: 2, name: 'Bob', age: 30, city: 'SPb' },
    { id: 3, name: 'Alice', age: 25, city: 'Moscow' },
  ];

  const columnConfig = [
    { key: 'name' as const, accessor: (row: (typeof testData)[0]) => row.name },
    { key: 'city' as const, accessor: (row: (typeof testData)[0]) => row.city },
  ];

  test('renders hook', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));
    expect(result.current).toBeDefined();
  });

  test('returns all rows when no filters', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));
    expect(result.current.filteredRows).toEqual(testData);
    expect(result.current.filters.size).toBe(2);
  });

  test('provides unique values per column', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));
    expect(result.current.uniqueValues.name).toEqual(['Alice', 'Bob']);
    expect(result.current.uniqueValues.city).toEqual(['Moscow', 'SPb']);
  });

  test('avoids recomputing uniqueValues for stable rows/columns refs', () => {
    const nameStringify = vi.fn<(value: unknown) => string>((value) => String(value));
    const cityStringify = vi.fn<(value: unknown) => string>((value) => String(value));

    const columns: Array<ColumnFilterConfig<(typeof testData)[number], 'name' | 'city'>> = [
      { key: 'name', accessor: (row) => row.name, stringify: nameStringify as (value: unknown) => string },
      { key: 'city', accessor: (row) => row.city, stringify: cityStringify as (value: unknown) => string },
    ];

    const { rerender } = renderHook(({ rows, columns }) => useTableFilters(rows, columns), {
      initialProps: { rows: testData, columns },
    });

    expect(nameStringify).toHaveBeenCalledTimes(testData.length);
    expect(cityStringify).toHaveBeenCalledTimes(testData.length);

    nameStringify.mockClear();
    cityStringify.mockClear();

    rerender({ rows: testData, columns });

    expect(nameStringify).not.toHaveBeenCalled();
    expect(cityStringify).not.toHaveBeenCalled();
  });

  test('recomputes uniqueValues when rows reference changes', () => {
    const nameStringify = vi.fn<(value: unknown) => string>((value) => String(value));
    const cityStringify = vi.fn<(value: unknown) => string>((value) => String(value));

    const columns: Array<ColumnFilterConfig<(typeof testData)[number], 'name' | 'city'>> = [
      { key: 'name', accessor: (row) => row.name, stringify: nameStringify as (value: unknown) => string },
      { key: 'city', accessor: (row) => row.city, stringify: cityStringify as (value: unknown) => string },
    ];

    const { rerender } = renderHook(({ rows, columns }) => useTableFilters(rows, columns), {
      initialProps: { rows: testData, columns },
    });

    nameStringify.mockClear();
    cityStringify.mockClear();

    rerender({ rows: [...testData], columns });

    expect(nameStringify).toHaveBeenCalledTimes(testData.length);
    expect(cityStringify).toHaveBeenCalledTimes(testData.length);
  });

  test('filters rows by single column', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    expect(result.current.filteredRows.length).toBe(2);
    expect(result.current.filteredRows.every((row) => row.name === 'Alice')).toBe(true);
  });

  test('filters rows by multiple values', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice', 'Bob']);
    });

    expect(result.current.filteredRows.length).toBe(3);
  });

  test('filters rows by multiple columns', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    act(() => {
      result.current.setFilter('city', ['Moscow']);
    });

    expect(result.current.filteredRows.length).toBe(2);
    expect(result.current.filteredRows.every((row) => row.name === 'Alice' && row.city === 'Moscow')).toBe(true);
  });

  test('resets all filters', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filteredRows).toEqual(testData);
    expect(result.current.filters.size).toBe(2);
    expect(result.current.filters.get('name')).toEqual([]);
    expect(result.current.filters.get('city')).toEqual([]);
  });

  test('converts filters to tokens', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    const tokens = result.current.convertFiltersToTokens();
    expect(tokens.length).toBe(1);
    expect(tokens[0].caption).toContain('name: Alice');
    expect(tokens[0].key).toBe('name-0');
  });

  test('removes filter token on onRemove', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    const tokens = result.current.convertFiltersToTokens();
    act(() => {
      tokens[0].onRemove();
    });

    expect(result.current.filteredRows).toEqual(testData);
  });

  test('skips empty values in uniqueValues', () => {
    const rowsWithEmpty = [
      { id: 1, name: '', age: 0, city: 'Moscow' },
      { id: 2, name: undefined as any, age: 0, city: '' },
    ];
    const { result } = renderHook(() => useTableFilters(rowsWithEmpty, columnConfig));

    expect(result.current.uniqueValues.name).toEqual([]);
    expect(result.current.uniqueValues.city).toEqual(['Moscow']);
  });

  test('filterPredicate overrides default filtering', () => {
    const { result } = renderHook(() =>
      useTableFilters(testData, [
        {
          key: 'city',
          accessor: (row) => row.city,
          filterPredicate: (row, selected) => (selected ? row.city === selected[0] && row.age > 25 : false),
        },
      ])
    );

    act(() => {
      result.current.setFilter('city', ['Moscow']);
    });

    expect(result.current.filteredRows).toEqual([]);
  });

  test('convertFiltersToTokens respects label and formatTokenCaption', () => {
    const columns = [
      {
        key: 'name' as const,
        accessor: (row: (typeof testData)[0]) => row.name,
        label: 'Имя',
        formatTokenCaption: (_k: string, label: string, value: string) => `${label} = ${value}`,
      },
    ];
    const { result } = renderHook(() => useTableFilters(testData, columns));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    const tokens = result.current.convertFiltersToTokens();
    expect(tokens[0].caption).toBe('Имя = Alice');

    act(() => tokens[0].onRemove());
    expect(result.current.filteredRows).toEqual(testData);
  });

  test('convertFiltersToTokens calls custom formatter when provided', () => {
    const formatTokenCaption = vi.fn((_k: string, label: string, value: string) => `${label} -> ${value}`);
    const columns = [
      {
        key: 'name' as const,
        accessor: (row: (typeof testData)[0]) => row.name,
        label: 'Имя',
        formatTokenCaption,
      },
    ];

    const { result } = renderHook(() => useTableFilters(testData, columns));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens[0].caption).toBe('Имя -> Alice');
    expect(formatTokenCaption).toHaveBeenCalledTimes(1);
    expect(formatTokenCaption).toHaveBeenCalledWith('name', 'Имя', 'Alice');
  });

  test('convertFiltersToTokens handles multiple values and removes only chosen', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice', 'Bob']);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens.map((t) => t.key)).toEqual(['name-0', 'name-1']);
    expect(tokens.map((t) => t.caption)).toEqual(['name: Alice', 'name: Bob']);

    act(() => {
      tokens[0].onRemove();
    });

    expect(result.current.filters.get('name')).toEqual(['Bob']);
    expect(result.current.filteredRows.map((row) => row.name)).toEqual(['Bob']);
  });

  test('convertFiltersToTokens handles scalar value and clears on remove', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('city', 'Moscow' as any);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens[0].key).toBe('city');
    expect(tokens[0].caption).toBe('city: Moscow');

    act(() => tokens[0].onRemove());

    expect(result.current.filters.get('city')).toEqual([]);
    expect(result.current.filteredRows).toEqual(testData);
  });

  test('convertFiltersToTokens skips values with empty stringify', () => {
    const columns = [
      {
        key: 'city' as const,
        accessor: (row: (typeof testData)[0]) => row.city,
        stringify: (value: unknown) => (value === 'Moscow' ? '' : String(value)),
      },
    ];

    const { result } = renderHook(() => useTableFilters(testData, columns));

    act(() => {
      result.current.setFilter('city', ['Moscow', 'SPb']);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens).toHaveLength(1);
    expect(tokens[0].caption).toBe('city: SPb');
  });

  test('convertFiltersToTokens ignores filters for unknown columns', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
      result.current.setFilter('unknown' as any, ['X']);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens).toHaveLength(1);
    expect(tokens[0].key).toBe('name-0');
  });

  test('convertFiltersToTokens handles multiple values and removes only chosen', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice', 'Bob']);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens.map((t) => t.key)).toEqual(['name-0', 'name-1']);
    expect(tokens.map((t) => t.caption)).toEqual(['name: Alice', 'name: Bob']);

    act(() => {
      tokens[0].onRemove();
    });

    expect(result.current.filters.get('name')).toEqual(['Bob']);
    expect(result.current.filteredRows.map((row) => row.name)).toEqual(['Bob']);
  });

  test('convertFiltersToTokens handles scalar value and clears on remove', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('city', 'Moscow' as any);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens[0].key).toBe('city');
    expect(tokens[0].caption).toBe('city: Moscow');

    act(() => tokens[0].onRemove());

    expect(result.current.filters.get('city')).toEqual([]);
    expect(result.current.filteredRows).toEqual(testData);
  });

  test('convertFiltersToTokens skips values with empty stringify', () => {
    const columns = [
      {
        key: 'city' as const,
        accessor: (row: (typeof testData)[0]) => row.city,
        stringify: (value: unknown) => (value === 'Moscow' ? '' : String(value)),
      },
    ];

    const { result } = renderHook(() => useTableFilters(testData, columns));

    act(() => {
      result.current.setFilter('city', ['Moscow', 'SPb']);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens).toHaveLength(1);
    expect(tokens[0].caption).toBe('city: SPb');
  });

  test('convertFiltersToTokens ignores filters for unknown columns', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
      result.current.setFilter('unknown' as any, ['X']);
    });

    const tokens = result.current.convertFiltersToTokens();

    expect(tokens).toHaveLength(1);
    expect(tokens[0].key).toBe('name-0');
  });

  test('can reset one filter while keeping others', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
      result.current.setFilter('city', ['Moscow']);
    });

    act(() => {
      result.current.setFilter('city', []);
    });

    expect(result.current.filters.get('name')).toEqual(['Alice']);
    expect(result.current.filters.get('city')).toEqual([]);
    expect(result.current.filteredRows.length).toBe(2);
  });

  test.each([null, undefined])('should handle null/undefined value in setFilter when %s passed', (testValue) => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', testValue as any);
    });

    expect(result.current.filters.get('name')).toBe(testValue);
    expect(result.current.filteredRows).toEqual(testData);
  });

  test('should handle null value in setFilter after setting filter', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    expect(result.current.filteredRows.length).toBe(2);

    act(() => {
      result.current.setFilter('name', null as any);
    });

    expect(result.current.filters.get('name')).toBe(null);
    expect(result.current.filteredRows).toEqual(testData);
  });

  test('should handle undefined value in setFilter after setting filter', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    expect(result.current.filteredRows.length).toBe(2);

    act(() => {
      result.current.setFilter('name', undefined as any);
    });

    expect(result.current.filters.get('name')).toBe(undefined);
    expect(result.current.filteredRows).toEqual(testData);
  });

  test('should handle array with null values in setFilter', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', [null as any, 'Alice']);
    });

    const filterValue = result.current.filters.get('name');
    expect(Array.isArray(filterValue)).toBe(true);
    expect(filterValue).toContain(null);
    expect(filterValue).toContain('Alice');
  });

  test('should handle array with undefined values in setFilter', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', [undefined as any, 'Alice']);
    });

    const filterValue = result.current.filters.get('name');
    expect(Array.isArray(filterValue)).toBe(true);
    expect(filterValue).toContain(undefined);
    expect(filterValue).toContain('Alice');
  });

  test('should handle empty string in setFilter', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', ['']);
    });

    expect(result.current.filters.get('name')).toEqual(['']);
    expect(result.current.filteredRows.length).toBe(0);
    expect(result.current.filteredRows).toEqual([]);
  });

  test('should handle null/undefined in convertFiltersToTokens', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', null as any);
    });

    const tokens = result.current.convertFiltersToTokens();
    expect(tokens.length).toBe(0);
  });

  test('should handle undefined in convertFiltersToTokens', () => {
    const { result } = renderHook(() => useTableFilters(testData, columnConfig));

    act(() => {
      result.current.setFilter('name', undefined as any);
    });

    const tokens = result.current.convertFiltersToTokens();
    expect(tokens.length).toBe(0);
  });

  test('rebuilds filters when columns change', () => {
    type Row = (typeof testData)[number];
    type ColumnKey = 'name' | 'city' | 'country';

    const initialColumns: Array<ColumnFilterConfig<Row, ColumnKey>> = [
      { key: 'name', accessor: (row) => row.name },
      { key: 'city', accessor: (row) => row.city },
    ];

    const nextColumns: Array<ColumnFilterConfig<Row, ColumnKey>> = [
      { key: 'city', accessor: (row) => row.city },
      { key: 'country', accessor: () => 'RU' },
    ];

    const { result, rerender } = renderHook(({ columns }) => useTableFilters<Row, ColumnKey>(testData, columns), {
      initialProps: { columns: initialColumns },
    });

    act(() => {
      result.current.setFilter('name', ['Alice']);
    });

    rerender({ columns: nextColumns });

    expect(result.current.filters.has('name')).toBe(false);
    expect(result.current.filters.get('city')).toEqual([]);
    expect(result.current.filters.get('country')).toEqual([]);
    expect(result.current.filters.size).toBe(2);
  });
});
