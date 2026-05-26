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
  const rows = initialData.slice(0, 5);

  const [onlyVip, setOnlyVip] = React.useState(false);
  const vipIds = new Set([rows[0]?.id, rows[2]?.id]);
  const visibleRows = onlyVip ? rows.filter((row) => vipIds.has(row.id)) : rows;

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Table.HeaderButton filtered={onlyVip} onClick={() => setOnlyVip((prev) => !prev)}>
              Клиенты {onlyVip ? '(только VIP)' : ''}
            </Table.HeaderButton>
          </Table.HeaderCell>
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
