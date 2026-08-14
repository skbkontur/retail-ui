import { Table, useTableFilters, useTableSort } from '@skbkontur/table';
import React from 'react';

export default {
  title: 'Filters',
  component: Table.DropdownFilter,
  parameters: {
    creevey: { skip: true },
  },
};

export const FiltersBasic = () => {
  type Status = 'new' | 'inProgress' | 'done';
  interface Row {
    id: number;
    city: string;
    status: Status;
  }

  const statusLabel: Record<Status, string> = {
    new: 'Новый',
    inProgress: 'В работе',
    done: 'Готово',
  };

  const source: Row[] = [
    { id: 1, city: 'Москва', status: 'new' },
    { id: 2, city: 'Екатеринбург', status: 'inProgress' },
    { id: 3, city: 'Казань', status: 'done' },
    { id: 4, city: 'Москва', status: 'done' },
  ];

  const columnConfig = [
    {
      key: 'city',
      accessor: (row: Row) => row.city,
      stringify: (value: string) => value,
      label: 'Город',
    },
    {
      key: 'status',
      accessor: (row: Row) => row.status,
      stringify: (value: Status) => statusLabel[value],
      label: 'Статус',
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows, convertFiltersToTokens, resetFilters } = useTableFilters(
    source,
    columnConfig,
  );
  const { sortedRows, handleSort, sortConfig } = useTableSort(filteredRows, { direction: 'asc' });
  const tokens = convertFiltersToTokens();

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="200px">
            <Table.DropdownSortableFilter
              options={uniqueValues.city}
              selectedOptions={filters.get('city') ?? []}
              onSelect={(selected: string[]) => setFilter('city', selected)}
              onSort={(direction) => handleSort('city', direction)}
              sortDirection={sortConfig.key === 'city' ? sortConfig.direction : undefined}
            >
              Город
            </Table.DropdownSortableFilter>
          </Table.HeaderCell>
          <Table.HeaderCell width="50%">
            <Table.DropdownFilter
              options={uniqueValues.status}
              selectedOptions={filters.get('status') ?? []}
              onSelect={(selected: string[]) => setFilter('status', selected)}
            >
              Статус
            </Table.DropdownFilter>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tokens.length > 0 && <Table.FilterResultRow tokens={tokens} onResetAll={resetFilters} />}
        {sortedRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.city}</Table.Cell>
            <Table.Cell>{statusLabel[row.status]}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const FilterChips = () => {
  type Status = 'new' | 'inProgress' | 'done';
  interface Row {
    id: number;
    city: string;
    status: Status;
  }

  const statusLabel: Record<Status, string> = {
    new: 'Новый',
    inProgress: 'В работе',
    done: 'Готово',
  };

  const source: Row[] = [
    { id: 1, city: 'Москва', status: 'new' },
    { id: 2, city: 'Екатеринбург', status: 'inProgress' },
    { id: 3, city: 'Казань', status: 'done' },
    { id: 4, city: 'Москва', status: 'done' },
  ];

  const columnConfig = [
    {
      key: 'city',
      accessor: (row: Row) => row.city,
      stringify: (value: string) => value,
      label: 'Город',
    },
    {
      key: 'status',
      accessor: (row: Row) => row.status,
      stringify: (value: Status) => statusLabel[value],
      label: 'Статус',
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows, convertFiltersToTokens, resetFilters } = useTableFilters(
    source,
    columnConfig,
  );

  const chips = convertFiltersToTokens();

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="200px">
            <Table.DropdownFilter
              options={uniqueValues.city}
              selectedOptions={filters.get('city') ?? []}
              onSelect={(selected: string[]) => setFilter('city', selected)}
              searchPlaceholder="Поиск города"
            >
              Город
            </Table.DropdownFilter>
          </Table.HeaderCell>
          <Table.HeaderCell width="50%">
            <Table.DropdownFilter
              options={uniqueValues.status}
              selectedOptions={filters.get('status') ?? []}
              onSelect={(selected: string[]) => setFilter('status', selected)}
            >
              Статус
            </Table.DropdownFilter>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {chips.length > 0 && <Table.FilterResultRow tokens={chips} onResetAll={resetFilters} />}
        {filteredRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.city}</Table.Cell>
            <Table.Cell>{statusLabel[row.status]}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
