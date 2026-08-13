import React from 'react';

import { initialData } from '../__stories__/data';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.FilterItem',
  component: Table.FilterItem,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const rows = initialData.slice(0, 4);
  const statuses = [
    { value: 'new', label: 'Новый' },
    { value: 'inProgress', label: 'В работе' },
    { value: 'done', label: 'Готово' },
    { value: 'archived', label: 'В архиве', disabled: true },
  ];

  const [selected, setSelected] = React.useState<string[]>(['new']);
  const toggleStatus = (status: string) =>
    setSelected((prev) => (prev.includes(status) ? prev.filter((item) => item !== status) : [...prev, status]));

  const CheckIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>
            <Table.Filter
              filtered={selected.length > 0}
              popup={statuses.map((status) => (
                <Table.FilterItem
                  key={status.value}
                  disabled={status.disabled}
                  icon={selected.includes(status.value) ? CheckIcon : undefined}
                  onClick={() => toggleStatus(status.value)}
                >
                  {status.label}
                </Table.FilterItem>
              ))}
            >
              Статус
            </Table.Filter>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell>{statuses.find((s) => selected.includes(s.value))?.label ?? '—'}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
