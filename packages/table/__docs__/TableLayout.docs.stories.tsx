import React from 'react';
import { Table } from '../src/components/Table/Table';

export default {
  title: 'Layout',
  component: Table,
  parameters: {
    creevey: { skip: true },
  },
};

type Row = { id: number; name: string; city: string };

export const LayoutBasics = () => {
  const rows: Row[] = [
    { id: 1, name: 'Иван Петров', city: 'Москва' },
    { id: 2, name: 'Мария Смирнова', city: 'Екатеринбург' },
    { id: 3, name: 'Алексей Козлов', city: 'Казань' },
  ];
  return (
    <Table hasChecked>
      <Table.Header sticky>
        <Table.Row>
          <Table.HeaderCheckboxCell checked={false} onClick={() => undefined} aria-label="Выбрать все строки" />
          <Table.HeaderCell bottomBorder width="200px">
            Имя
          </Table.HeaderCell>
          <Table.HeaderCell width="50%">Город</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell checkboxCell />
          <Table.HeaderCell>Колонка 1</Table.HeaderCell>
          <Table.HeaderCell>Колонка 2</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id} onClick={() => console.log('row', row.id)}>
            <Table.CheckboxCell
              checked={false}
              onCheckboxClick={() => undefined}
              aria-label={`Выбрать строку ${row.name}`}
            />
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell noWrap>{row.city}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer sticky>
        <Table.Row>
          <Table.Cell colSpan={3}>Показано {rows.length} записей</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export const WidthsAndSpans = () => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width="120px">Статус</Table.HeaderCell>
        <Table.HeaderCell width="40%">Описание</Table.HeaderCell>
        <Table.HeaderCell width="60%" colSpan={2}>
          Ответственный
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell>В работе</Table.Cell>
        <Table.Cell noWrap>Поддерживается `colSpan` и `rowSpan`</Table.Cell>
        <Table.Cell>Ирина</Table.Cell>
        <Table.Cell>Команда поддержки</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell rowSpan={2}>Новое</Table.Cell>
        <Table.Cell>Собирать статистику</Table.Cell>
        <Table.Cell colSpan={2}>Сервис аналитики</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Отправить отчёт</Table.Cell>
        <Table.Cell>Спринт Апрель</Table.Cell>
        <Table.Cell>CRM</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
