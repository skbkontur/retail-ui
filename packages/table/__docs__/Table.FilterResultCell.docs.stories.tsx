import React from 'react';
import { Table } from '../src/components/Table/Table';
import { initialData } from '../__stories__/data';

export default {
  title: 'Components/Table.FilterResultCell',
  component: Table.FilterResultCell,
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
        <Table.FilterResultRow colspan={2} tokens={tokens} onResetAll={() => console.log('reset filters')}>
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
