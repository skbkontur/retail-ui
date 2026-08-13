import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Table',
  component: Table,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 3);

  const renderHeader = () => (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Клиент</Table.HeaderCell>
        <Table.HeaderCell>Регион</Table.HeaderCell>
        <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );

  const renderRows = () =>
    rows.map((row) => (
      <Table.Row key={row.id}>
        <Table.Cell>{row.client}</Table.Cell>
        <Table.Cell>{row.region}</Table.Cell>
        <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
      </Table.Row>
    ));

  return (
    <div style={{ display: 'grid', gap: 24, padding: 12 }}>
      <section>
        <h4 style={{ margin: '0 0 8px' }}>Фиксированная ширина</h4>
        <Table size="small" width="640px">
          {renderHeader()}
          <Table.Body>{renderRows()}</Table.Body>
        </Table>
      </section>

      <section>
        <h4 style={{ margin: '0 0 8px' }}>table-layout: auto</h4>
        <Table size="small" auto>
          {renderHeader()}
          <Table.Body>{renderRows()}</Table.Body>
        </Table>
      </section>

      <section>
        <h4 style={{ margin: '0 0 8px' }}>minWidth + overflow контейнер</h4>
        <div style={{ width: 360, overflowX: 'auto', border: '1px dashed #c4c8d4', padding: 4 }}>
          <Table size="small" minWidth="640px">
            {renderHeader()}
            <Table.Body>{renderRows()}</Table.Body>
          </Table>
        </div>
      </section>
    </div>
  );
};
