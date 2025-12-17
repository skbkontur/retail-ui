import React from 'react';
import { Table } from '../src/components/Table/Table';
import { initialData } from '../__stories__/data';

export default {
  title: 'Components/Table.Sort',
  component: Table.Sort,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 3);
  const [sorted, setSorted] = React.useState<'asc' | 'desc'>('asc');

  const sortedRows = [...rows].sort((a, b) => (sorted === 'desc' ? b.amount - a.amount : a.amount - b.amount));

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.Sort sorted={sorted} onSort={setSorted}>
            Сумма
          </Table.Sort>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
