import React from 'react';
import { Table } from '../src/components/Table/Table';
import { initialData } from '../__stories__/data';

export default {
  title: 'Components/Table.DropdownFilter',
  component: Table.DropdownFilter,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 5);
  const options = Array.from(new Set(rows.map((r) => r.region)));

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([options[0]]);
  const filteredRows = selectedOptions.length === 0 ? rows : rows.filter((row) => selectedOptions.includes(row.region));

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.DropdownFilter
            options={options}
            selectedOptions={selectedOptions}
            onSelect={setSelectedOptions}
            searchPlaceholder="Найти регион"
          >
            Регион
          </Table.DropdownFilter>
          <Table.HeaderCell>Клиент</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filteredRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.region}</Table.Cell>
            <Table.Cell>{row.client}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
