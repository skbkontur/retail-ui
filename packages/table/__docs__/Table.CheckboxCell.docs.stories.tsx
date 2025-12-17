import React, { useState } from 'react';
import { Table } from '../src/components/Table/Table';
import { initialData } from '../__stories__/data';

export default {
  title: 'Components/Table.CheckboxCell',
  component: Table.CheckboxCell,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 3);
  const [selected, setSelected] = React.useState<number[]>([]);
  const allSelected = selected.length === rows.length;

  const toggleRow = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

  return (
    <Table hasChecked size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCheckboxCell
            checked={allSelected}
            initialIndeterminate={!allSelected && selected.length > 0}
            onClick={() => setSelected(allSelected ? [] : rows.map((row) => row.id))}
            aria-label="Выбрать все строки"
          />
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>Регион</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.CheckboxCell
              checked={selected.includes(row.id)}
              onCheckboxClick={() => toggleRow(row.id)}
              aria-label={`Выбрать ${row.client}`}
            />
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell noWrap>{row.region}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
