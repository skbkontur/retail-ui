import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Footer',
  component: Table.Footer,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 16);
  const total = rows.reduce((sum, row) => sum + row.amount, 0);
  return (
    <div style={{ width: 720, height: 260, overflow: 'auto' }}>
      <Table size="small">
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell width="50%">Клиент</Table.HeaderCell>
            <Table.HeaderCell width="120px" currency>
              Сумма, ₽
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell>
              <strong>Итого по {rows.length} клиентам</strong>
            </Table.Cell>
            <Table.Cell currency>
              <strong>{total.toLocaleString('ru-RU')}</strong>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};
