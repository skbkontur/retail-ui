import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.FilterSearch',
  component: Table.FilterSearch,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData;
  const allCities = React.useMemo(() => Array.from(new Set(initialData.map((row) => row.region))).sort(), []);

  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);

  const matchedCities = allCities.filter((option) => option.toLowerCase().includes(search.trim().toLowerCase()));
  const toggleOption = (option: string) =>
    setSelected((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));

  const visibleRows = selected.length === 0 ? rows : rows.filter((row) => selected.includes(row.region));

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="200px">Клиент</Table.HeaderCell>
          <Table.HeaderCell>
            <Table.Filter
              filtered={selected.length > 0}
              popup={
                <>
                  <Table.FilterSearch
                    searchQuery={search}
                    handleSearchQuery={setSearch}
                    searchPlaceholder="Искать регион"
                  />
                  {matchedCities.length === 0 ? (
                    <Table.FilterItem disabled>Ничего не найдено</Table.FilterItem>
                  ) : (
                    matchedCities.map((option) => (
                      <Table.FilterItem key={option} onClick={() => toggleOption(option)}>
                        {option}
                      </Table.FilterItem>
                    ))
                  )}
                </>
              }
            >
              Регион {selected.length > 0 && `(${selected.length})`}
            </Table.Filter>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {visibleRows.slice(0, 6).map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell>{row.region}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
