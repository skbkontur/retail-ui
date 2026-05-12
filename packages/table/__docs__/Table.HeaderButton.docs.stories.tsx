import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.HeaderButton',
  component: Table.HeaderButton,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 3);

  const [filtered, setFiltered] = React.useState(false);

  const visibleRows = filtered ? rows.slice(0, 1) : rows;

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderButton filtered={filtered} onClick={() => setFiltered((prev) => !prev)}>
            Клиенты
          </Table.HeaderButton>
          <Table.HeaderCell>Регион</Table.HeaderCell>
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
