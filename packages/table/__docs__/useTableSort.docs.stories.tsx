import React from 'react';
import { Table, useTableFilters, useTableSort } from '..';

export default {
  title: 'Hooks/useTableSort',
};

export const SimpleSortExample = () => {
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
      key: 'city',
      accessor: (row: TableRow) => row.city,
      stringifier: (value: string) => value,
      predicate: (selected: string[], value: string) => selected.length === 0 || selected.includes(value),
    },
  ];

  const { filteredRows } = useTableFilters<TableRow, string>(data, columnConfig);
  const { sortedRows, sortConfig, handleSort } = useTableSort(filteredRows, { key: 'name', direction: 'asc' });

  return (
    <div style={{ width: 520, padding: 12 }}>
      <h4>Простая сортировка по имени и баллу</h4>
      <Table>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell width={'200px'}>
              <Table.DropdownSortableFilter
                options={['Иван', 'Мария', 'Алексей', 'Елена', 'Дмитрий']}
                selectedOptions={[]}
                onSelect={() => {}}
                onSort={(direction) => handleSort('name', direction)}
                sortDirection={sortConfig.key === 'name' ? (sortConfig.direction ?? undefined) : undefined}
              >
                Имя
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
            <Table.HeaderCell width={'160px'}>
              <Table.DropdownSortableFilter
                options={[]}
                selectedOptions={[]}
                onSelect={() => {}}
                onSort={(direction) => handleSort('score', direction)}
                sortDirection={sortConfig.key === 'score' ? (sortConfig.direction ?? undefined) : undefined}
              >
                Балл
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
