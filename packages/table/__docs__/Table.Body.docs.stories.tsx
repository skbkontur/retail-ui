import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Body',
  component: Table.Body,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 4);
  const tokens = [{ key: 'city', caption: 'Город: Москва', onRemove: () => console.log('remove city') }];

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="50%">Клиент</Table.HeaderCell>
          <Table.HeaderCell width="120px" currency>
            Сумма, ₽
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.FilterResultRow colSpan={2} tokens={tokens} onResetAll={() => console.log('reset')} />
        {rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell colSpan={2}>Это служебная строка, которую можно положить прямо в Table.Body</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
