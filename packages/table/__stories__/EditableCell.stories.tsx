import { ComboBox } from '@skbkontur/react-ui/components/ComboBox';
import { CurrencyInput } from '@skbkontur/react-ui/components/CurrencyInput';
import { CurrencyLabel } from '@skbkontur/react-ui/components/CurrencyLabel';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Select } from '@skbkontur/react-ui/components/Select';
import { Table } from '@skbkontur/table';
import React, { useState } from 'react';

export default {
  title: 'Table/Editable Cell',
};

const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург'];
const positions = [
  { value: 'dev', label: 'Разработчик' },
  { value: 'design', label: 'Дизайнер' },
  { value: 'pm', label: 'Менеджер' },
];

const getPositions = (query: string) =>
  Promise.resolve(positions.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())));

const initialRows = [
  { id: 1, name: 'Иван Петров', city: 'Москва', position: positions[0] },
  { id: 2, name: 'Мария Сидорова', city: 'Санкт-Петербург', position: positions[1] },
];

const EditableTable = ({ size }: { size: 'small' | 'medium' | 'large' }) => {
  const [rows, setRows] = useState(initialRows);
  const update = (id: number, patch: Partial<(typeof initialRows)[number]>) =>
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));

  return (
    <Table size={size}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Имя</Table.HeaderCell>
          <Table.HeaderCell scope="col">Город</Table.HeaderCell>
          <Table.HeaderCell scope="col">Должность</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            <Table.EditableCell
              editor={
                <Input
                  size={size}
                  width="100%"
                  value={row.name}
                  onValueChange={(name) => update(row.id, { name })}
                  aria-label="Имя"
                />
              }
            >
              {row.name}
            </Table.EditableCell>
            <Table.EditableCell
              editor={
                <Select<string>
                  size={size}
                  width="100%"
                  items={cities}
                  value={row.city}
                  onValueChange={(city) => update(row.id, { city })}
                  aria-label="Город"
                />
              }
            >
              {row.city}
            </Table.EditableCell>
            <Table.EditableCell
              editor={
                <ComboBox
                  size={size}
                  width="100%"
                  getItems={getPositions}
                  value={row.position}
                  onValueChange={(position) => update(row.id, { position })}
                  aria-label="Должность"
                />
              }
            >
              {row.position.label}
            </Table.EditableCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

/** Отступ вокруг таблиц — чтобы рамка фокуса поля не обрезалась краем кадра. */
export const Sizes = () => (
  <div style={{ padding: 8, width: 600, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <EditableTable size="small" />
    <EditableTable size="medium" />
    <EditableTable size="large" />
  </div>
);

/** Суммы: текст по правому краю под заголовком, поле выступает вправо. Отступ — под рамку фокуса. */
export const Currency = () => {
  const [amounts, setAmounts] = useState([120000, 48500.5]);

  return (
    <div style={{ padding: 8, width: 400 }}>
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
          {amounts.map((amount, index) => (
            <Table.Row key={index}>
              <Table.Cell>Услуга {index + 1}</Table.Cell>
              <Table.EditableCell
                currency
                editor={
                  <CurrencyInput
                    size="small"
                    width="100%"
                    value={amount}
                    onValueChange={(value) =>
                      setAmounts((prev) => prev.map((item, i) => (i === index ? (value ?? 0) : item)))
                    }
                    aria-label="Сумма"
                  />
                }
              >
                <CurrencyLabel value={amount} />
              </Table.EditableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
