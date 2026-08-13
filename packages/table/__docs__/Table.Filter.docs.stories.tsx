import { Button } from '@skbkontur/react-ui/components/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { Input } from '@skbkontur/react-ui/components/Input';
import React from 'react';

import { Table } from '../src/components/Table/Table';

export default {
  title: 'Components/Table.Filter',
  component: Table.Filter,
  parameters: {
    creevey: { skip: true },
  },
};

// Адаптация фильтра «Путевые листы» из KL.Storehouse.Web: один заголовок,
// внутри popup'а — кастомная форма с поиском, чекбоксами и кнопками
// «Применить» / «Сбросить». Table.Filter здесь — низкоуровневая обёртка
// для произвольного popup-контента, в отличие от готового DropdownFilter.
export const Basic = () => {
  interface Row {
    id: number;
    number: string;
    vehicle: string;
    driver: string;
    awaitsMedic: boolean;
    awaitsMechanic: boolean;
  }

  const rows: Row[] = [
    {
      id: 1,
      number: 'ПЛ-001242',
      vehicle: 'А123ВС 46',
      driver: 'Иванов И. И.',
      awaitsMedic: true,
      awaitsMechanic: false,
    },
    {
      id: 2,
      number: 'ПЛ-001243',
      vehicle: 'В456ХК 19',
      driver: 'Петров П. П.',
      awaitsMedic: false,
      awaitsMechanic: true,
    },
    {
      id: 3,
      number: 'ПЛ-001244',
      vehicle: 'Е789ТС 78',
      driver: 'Сидорова С. С.',
      awaitsMedic: false,
      awaitsMechanic: false,
    },
    {
      id: 4,
      number: 'ПЛ-001245',
      vehicle: 'К321РТ 66',
      driver: 'Кузнецов К. К.',
      awaitsMedic: true,
      awaitsMechanic: true,
    },
    {
      id: 5,
      number: 'ПЛ-001246',
      vehicle: 'М999УА 77',
      driver: 'Орлова О. О.',
      awaitsMedic: false,
      awaitsMechanic: false,
    },
  ];

  // Черновое состояние формы внутри popup'а
  const [draftQuery, setDraftQuery] = React.useState('');
  const [draftMedic, setDraftMedic] = React.useState(false);
  const [draftMechanic, setDraftMechanic] = React.useState(false);

  // Применённое состояние, которое реально фильтрует таблицу
  const [appliedQuery, setAppliedQuery] = React.useState('');
  const [appliedMedic, setAppliedMedic] = React.useState(false);
  const [appliedMechanic, setAppliedMechanic] = React.useState(false);

  const hasAppliedFilter = appliedQuery.trim() !== '' || appliedMedic || appliedMechanic;

  const apply = () => {
    setAppliedQuery(draftQuery);
    setAppliedMedic(draftMedic);
    setAppliedMechanic(draftMechanic);
  };

  const reset = () => {
    setDraftQuery('');
    setDraftMedic(false);
    setDraftMechanic(false);
    setAppliedQuery('');
    setAppliedMedic(false);
    setAppliedMechanic(false);
  };

  const visibleRows = rows.filter((row) => {
    if (appliedQuery.trim() && !row.number.toLowerCase().includes(appliedQuery.trim().toLowerCase())) {
      return false;
    }
    if (appliedMedic && !row.awaitsMedic) {
      return false;
    }
    if (appliedMechanic && !row.awaitsMechanic) {
      return false;
    }
    return true;
  });

  const popup = (
    <div style={{ padding: 16, display: 'grid', gap: 12, minWidth: 280 }}>
      <Input value={draftQuery} onValueChange={setDraftQuery} placeholder="Номер путевого листа" width="100%" />
      <div style={{ display: 'grid', gap: 8 }}>
        <strong style={{ fontSize: 12, opacity: 0.7 }}>Ожидает подписи</strong>
        <Checkbox checked={draftMedic} onValueChange={setDraftMedic}>
          Медика
        </Checkbox>
        <Checkbox checked={draftMechanic} onValueChange={setDraftMechanic}>
          Механика
        </Checkbox>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button onClick={reset}>Сбросить</Button>
        <Button use="primary" onClick={apply}>
          Применить
        </Button>
      </div>
    </div>
  );

  return (
    <Table size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="180px">
            <Table.Filter filtered={hasAppliedFilter} popup={popup}>
              Путевой лист
            </Table.Filter>
          </Table.HeaderCell>
          <Table.HeaderCell width="160px">Транспортное средство</Table.HeaderCell>
          <Table.HeaderCell>Водитель</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {visibleRows.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={3}>Нет путевых листов под выбранные фильтры</Table.Cell>
          </Table.Row>
        ) : (
          visibleRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.number}</Table.Cell>
              <Table.Cell>{row.vehicle}</Table.Cell>
              <Table.Cell>{row.driver}</Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  );
};
