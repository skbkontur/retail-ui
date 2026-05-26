import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Header',
  component: Table.Header,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 12);
  return (
    <div style={{ width: 720, height: 240, overflow: 'auto' }}>
      <Table size="small">
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell rowSpan={2}>Клиент</Table.HeaderCell>
            <Table.HeaderCell colSpan={2} bottomBorder>
              Отчётность
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Регион</Table.HeaderCell>
            <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell>{row.region}</Table.Cell>
              <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
