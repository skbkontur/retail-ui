import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.HeaderCell',
  component: Table.HeaderCell,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 4);
  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="200px">Клиент</Table.HeaderCell>
          <Table.HeaderCell width="120px" noWrap>
            Телефон
          </Table.HeaderCell>
          <Table.HeaderCell>Регион</Table.HeaderCell>
          <Table.HeaderCell width="160px" currency>
            Сумма, ₽
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell noWrap>{row.responsible.name}</Table.Cell>
            <Table.Cell>{row.region}</Table.Cell>
            <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
