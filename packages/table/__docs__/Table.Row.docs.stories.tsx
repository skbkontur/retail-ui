import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Row',
  component: Table.Row,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 5);
  const [checked, setChecked] = React.useState<Set<number>>(new Set([rows[1].id]));
  const [activeId, setActiveId] = React.useState<number | null>(null);

  const toggleChecked = (id: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  return (
    <Table hasChecked size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCheckboxCell
            checked={checked.size === rows.length}
            initialIndeterminate={checked.size > 0 && checked.size < rows.length}
            onClick={() =>
              setChecked((prev) => (prev.size === rows.length ? new Set() : new Set(rows.map((row) => row.id))))
            }
            aria-label="Выбрать все"
          />
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>Регион</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row, index) => (
          <Table.Row
            key={row.id}
            checked={checked.has(row.id)}
            bottomBorder={index !== rows.length - 1}
            onClick={() => setActiveId((current) => (current === row.id ? null : row.id))}
          >
            <Table.CheckboxCell
              checked={checked.has(row.id)}
              onCheckboxClick={() => toggleChecked(row.id)}
              aria-label={`Выбрать строку ${row.client}`}
            />
            <Table.Cell>{activeId === row.id ? <strong>{row.client}</strong> : row.client}</Table.Cell>
            <Table.Cell>{row.region}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
