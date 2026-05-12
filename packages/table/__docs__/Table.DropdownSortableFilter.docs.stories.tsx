import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.DropdownSortableFilter',
  component: Table.DropdownSortableFilter,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 5);
  const options = Array.from(new Set(rows.map((r) => r.region)));

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [sorted, setSorted] = React.useState<'asc' | 'desc' | undefined>();

  const filtered = selectedOptions.length === 0 ? rows : rows.filter((row) => selectedOptions.includes(row.region));

  const sortedRows = [...filtered].sort((a, b) => {
    if (!sorted) {
      return 0;
    }
    return sorted === 'asc' ? a.amount - b.amount : b.amount - a.amount;
  });

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.DropdownSortableFilter
            options={options}
            selectedOptions={selectedOptions}
            onSelect={setSelectedOptions}
            sortDirection={sorted}
            onSort={setSorted}
            sortAscLabel="Сумма по возрастанию"
            sortDescLabel="Сумма по убыванию"
          >
            Регион
          </Table.DropdownSortableFilter>
          <Table.HeaderCell width="140px">Сумма</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.region}</Table.Cell>
            <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
