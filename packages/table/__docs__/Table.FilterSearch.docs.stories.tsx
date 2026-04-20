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
  const rows = initialData.slice(0, 4);
  const options = ['Москва', 'Казань', 'Екатеринбург', 'Краснодар'];
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(search.toLowerCase()));
  const toggleOption = (option: string) =>
    setSelected((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));

  const visibleRows = selected.length === 0 ? rows : rows.filter((row) => selected.includes(row.region));

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.Filter
            filtered={selected.length > 0}
            popup={
              <>
                <Table.FilterSearch
                  searchQuery={search}
                  handleSearchQuery={setSearch}
                  searchPlaceholder="Искать город"
                />
                {filteredOptions.map((option) => (
                  <Table.FilterItem key={option} onClick={() => toggleOption(option)}>
                    {option}
                  </Table.FilterItem>
                ))}
              </>
            }
          >
            Регион
          </Table.Filter>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {visibleRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell>{row.region}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
