import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.FilterResultCell',
  component: Table.FilterResultCell,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 3);
  const [tokens, setTokens] = React.useState([
    { key: 'city', caption: 'Город: Москва' },
    { key: 'status', caption: 'Статус: Новый' },
  ]);
  const tokensWithRemove = tokens.map((token) => ({
    ...token,
    onRemove: () => setTokens((prev) => prev.filter((t) => t.key !== token.key)),
  }));

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>Регион</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.FilterResultCell colSpan={2} tokens={tokensWithRemove} onResetAll={() => setTokens([])}>
            <strong>Активные фильтры:</strong>
          </Table.FilterResultCell>
        </Table.Row>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell>{row.region}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
