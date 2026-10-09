import { CurrencyInput } from '@skbkontur/react-ui/components/CurrencyInput';
import { CurrencyLabel } from '@skbkontur/react-ui/components/CurrencyLabel';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Select } from '@skbkontur/react-ui/components/Select';
import React from 'react';

import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.EditableCell',
  component: Table.EditableCell,
  parameters: {
    creevey: { skip: true },
  },
};

export const Basic = () => {
  const statuses = ['Новый', 'В работе', 'Готово'];
  const [rows, setRows] = React.useState([
    { id: 1, title: 'Отчёт за квартал', status: 'В работе' },
    { id: 2, title: 'Сверка с контрагентом', status: 'Новый' },
  ]);
  const update = (id: number, patch: Partial<(typeof rows)[number]>) =>
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Задача</Table.HeaderCell>
          <Table.HeaderCell scope="col">Статус</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.EditableCell
              editor={
                <Input
                  size="small"
                  width="100%"
                  value={row.title}
                  onValueChange={(title) => update(row.id, { title })}
                  aria-label="Задача"
                />
              }
            >
              {row.title}
            </Table.EditableCell>
            <Table.EditableCell
              editor={
                <Select<string>
                  size="small"
                  width="100%"
                  items={statuses}
                  value={row.status}
                  onValueChange={(status) => update(row.id, { status })}
                  aria-label="Статус"
                />
              }
            >
              {row.status}
            </Table.EditableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const WithTextAround = () => {
  const [rows, setRows] = React.useState([
    { id: 1, client: 'ООО «Ромашка»', comment: 'Позвонить в понедельник', amount: '120 000 ₽' },
    { id: 2, client: 'ИП Сидоров', comment: 'Ждём оплату', amount: '48 500 ₽' },
    { id: 3, client: 'АО «Вектор»', comment: 'Счёт отправлен', amount: '310 000 ₽' },
  ]);
  const updateComment = (id: number, comment: string) =>
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, comment } : row)));

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Клиент</Table.HeaderCell>
          <Table.HeaderCell scope="col">Комментарий</Table.HeaderCell>
          <Table.HeaderCell scope="col" currency>
            Сумма
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id} bottomBorder>
            <Table.Cell>{row.client}</Table.Cell>
            <Table.EditableCell
              editor={
                <Input
                  size="small"
                  width="100%"
                  value={row.comment}
                  onValueChange={(comment) => updateComment(row.id, comment)}
                  aria-label="Комментарий"
                />
              }
            >
              {row.comment}
            </Table.EditableCell>
            <Table.Cell currency>{row.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const Currency = () => {
  const [rows, setRows] = React.useState([
    { id: 1, service: 'Внедрение', amount: 120000 },
    { id: 2, service: 'Поддержка', amount: 48500.5 },
    { id: 3, service: 'Обучение', amount: 9900 },
  ]);
  const updateAmount = (id: number, amount: number) =>
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, amount } : row)));

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Услуга</Table.HeaderCell>
          <Table.HeaderCell scope="col" currency>
            Сумма, ₽
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id} bottomBorder>
            <Table.Cell>{row.service}</Table.Cell>
            <Table.EditableCell
              currency
              editor={
                <CurrencyInput
                  size="small"
                  width="100%"
                  value={row.amount}
                  onValueChange={(amount) => updateAmount(row.id, amount ?? 0)}
                  aria-label="Сумма"
                />
              }
            >
              <CurrencyLabel value={row.amount} />
            </Table.EditableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
