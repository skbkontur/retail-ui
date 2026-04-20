import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Token',
  component: Table.Token,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 2);
  const tokens = [
    { key: 'city', caption: 'Город: Москва', onRemove: () => console.log('remove city') },
    { key: 'status', caption: 'Статус: Новый', onRemove: () => console.log('remove status') },
  ];

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>Регион</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.FilterResultRow colSpan={2} tokens={tokens} onResetAll={() => console.log('reset filters')}>
          Применены фильтры
        </Table.FilterResultRow>
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
