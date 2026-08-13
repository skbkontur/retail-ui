import React from 'react';

import { Table, useTableFilters, useTableSort, useTableRowSelection } from '..';

export default {
  title: 'Hooks/useTableRowSelection',
};

export const SimpleSelectionExample = () => {
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
      stringify: (value: string) => value,
    },
  ];

  const { filteredRows } = useTableFilters<TableRow, string>(data, columnConfig);
  const { sortedRows } = useTableSort(filteredRows);
  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(sortedRows);

  return (
    <div style={{ width: 520, padding: 12 }}>
      <h4>Простой выбор строк после фильтрации/сортировки</h4>
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
            <Table.HeaderCell width={'200px'}>Имя</Table.HeaderCell>
            <Table.HeaderCell width={'160px'}>Город</Table.HeaderCell>
            <Table.HeaderCell width={'120px'}>Балл</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.map((row) => (
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
          ))}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell checkboxCell />
            <Table.Cell colSpan={3}>Выбрано: {checkedRows.size}</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};
