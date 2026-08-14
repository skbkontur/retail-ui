import { Table, useTableFilters, useTableSort, useTableRowSelection, TableFilterResultRow } from '@skbkontur/table';
import React from 'react';

export default {
  title: 'Hooks/useTableFilters',
};

export const SimpleFiltersExample = () => {
  const data = [
    { id: 1, name: 'Иван', city: 'Москва', score: 82 },
    { id: 2, name: 'Мария', city: 'СПб', score: 91 },
    { id: 3, name: 'Алексей', city: 'Казань', score: 75 },
    { id: 4, name: 'Елена', city: 'Москва', score: 88 },
    { id: 5, name: 'Дмитрий', city: 'СПб', score: 79 },
  ];

  type TableRow = (typeof data)[0];

  const columnConfig = [
    {
      key: 'name',
      accessor: (row: TableRow) => row.name,
      stringify: (value: string) => value,
    },
    {
      key: 'city',
      accessor: (row: TableRow) => row.city,
      stringify: (value: string) => value,
    },
    {
      key: 'score',
      accessor: (row: TableRow) => row.score,
      stringify: (value: number) => value.toString(),
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows, resetFilters, convertFiltersToTokens } = useTableFilters<
    TableRow,
    string
  >(data, columnConfig);
  const { sortedRows, sortConfig, handleSort } = useTableSort(filteredRows);
  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(sortedRows);

  const tokens = convertFiltersToTokens();

  return (
    <div style={{ width: 760, padding: 12 }}>
      <h4>Простая таблица с фильтрами, сортировкой и выбором строк</h4>
      <Table hasChecked={hasChecked}>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCheckboxCell
              checkboxRef={checkboxRef}
              checked={isCheckedAll}
              onClick={selectAll}
              initialIndeterminate={hasChecked}
              aria-label="Выбрать все строки"
            />
            <Table.HeaderCell width={'200px'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.name}
                selectedOptions={filters.get('name') ?? []}
                onSelect={(selected: string[]) => setFilter('name', selected)}
                onSort={(direction) => handleSort('name', direction)}
                sortDirection={sortConfig.key === 'name' ? (sortConfig.direction ?? undefined) : undefined}
              >
                Имя
                {filters.get('name')?.length ? ` (${filters.get('name')?.length})` : ''}
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
            <Table.HeaderCell width={'160px'}>
              <Table.DropdownFilter
                options={uniqueValues.city}
                selectedOptions={filters.get('city') ?? []}
                onSelect={(selected: string[]) => setFilter('city', selected)}
              >
                Город
              </Table.DropdownFilter>
            </Table.HeaderCell>
            <Table.HeaderCell width={'120px'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.score}
                selectedOptions={filters.get('score') ?? []}
                onSelect={(selected: string[]) => setFilter('score', selected)}
                onSort={(direction) => handleSort('score', direction)}
                sortDirection={sortConfig.key === 'score' ? (sortConfig.direction ?? undefined) : undefined}
              >
                Балл
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tokens.length > 0 && <TableFilterResultRow tokens={tokens} onResetAll={resetFilters} />}
          {sortedRows.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={4}>Нет данных</Table.Cell>
            </Table.Row>
          ) : (
            sortedRows.map((row) => (
              <Table.Row key={row.id} checked={checkedRows.has(row.id)}>
                <Table.CheckboxCell
                  checked={isRowChecked(row.id)}
                  onCheckboxClick={(e) => toggleRow(e, row.id)}
                  aria-label={`Выбрать строку ${row.name}`}
                />
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.city}</Table.Cell>
                <Table.Cell>{row.score}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell checkboxCell />
            <Table.Cell colSpan={3}>
              Показано {sortedRows.length} из {data.length}. Выбрано: {checkedRows.size}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};
