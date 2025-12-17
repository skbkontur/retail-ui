import React from 'react';
import { Table } from '../src/components/Table/Table';
import { initialData } from '../__stories__/data';

export default {
  title: 'Components/Table.Footer',
  component: Table.Footer,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 3);
  return (
    <Table hasChecked size="small">
      <Table.Header sticky>
        <Table.Row>
          <Table.HeaderCheckboxCell checked={false} onClick={() => undefined} aria-label="Выбрать все строки" />
          <Table.HeaderCell width="33.33%">Клиент</Table.HeaderCell>
          <Table.HeaderCell width="120px" currency>
            Сумма
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id} onClick={() => console.log('row', row.id)}>
            <Table.CheckboxCell
              checked={false}
              onCheckboxClick={() => undefined}
              aria-label={`Выбрать ${row.client}`}
            />
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer sticky>
        <Table.Row>
          <Table.Cell colSpan={3}>Всего {rows.length} строк</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
