import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Sort',
  component: Table.Sort,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 5);
  const [amountSort, setAmountSort] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const [clientSort, setClientSort] = React.useState<'asc' | 'desc' | undefined>('asc');

  const sortedRows = React.useMemo(() => {
    const next = [...rows];
    if (amountSort) {
      next.sort((a, b) => (amountSort === 'asc' ? a.amount - b.amount : b.amount - a.amount));
    } else if (clientSort) {
      next.sort((a, b) => (clientSort === 'asc' ? a.client.localeCompare(b.client) : b.client.localeCompare(a.client)));
    }
    return next;
  }, [rows, amountSort, clientSort]);

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Table.Sort
              sortDirection={clientSort}
              onSort={(direction) => {
                setClientSort(direction);
                setAmountSort(undefined);
              }}
            >
              Клиент
            </Table.Sort>
          </Table.HeaderCell>
          <Table.HeaderCell>Регион</Table.HeaderCell>
          <Table.HeaderCell currency>
            <Table.Sort
              sortDirection={amountSort}
              onSort={(direction) => {
                setAmountSort(direction);
                setClientSort(undefined);
              }}
            >
              Сумма
            </Table.Sort>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedRows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell>{row.region}</Table.Cell>
            <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
