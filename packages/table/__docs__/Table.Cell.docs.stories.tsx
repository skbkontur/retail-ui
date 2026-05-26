import React from 'react';

import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Cell',
  component: Table.Cell,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => (
  <Table size="small">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width="180px">Клиент</Table.HeaderCell>
        <Table.HeaderCell width="160px">Телефон</Table.HeaderCell>
        <Table.HeaderCell>Комментарий</Table.HeaderCell>
        <Table.HeaderCell width="120px" currency>
          Сумма, ₽
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell rowSpan={2}>ООО «Ромашка»</Table.Cell>
        <Table.Cell noWrap>8 (495) 555-12-34</Table.Cell>
        <Table.Cell>Договор № 102 от 14.10.2025, подписан в Москве.</Table.Cell>
        <Table.Cell currency>85 000,00</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell noWrap>8 (495) 555-12-35</Table.Cell>
        <Table.Cell>Дополнительное соглашение № 1 — продление до конца года.</Table.Cell>
        <Table.Cell currency>17 500,00</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell colSpan={3}>Итого по контрагенту</Table.Cell>
        <Table.Cell currency>
          <strong>102 500,00</strong>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
