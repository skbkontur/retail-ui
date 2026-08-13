import { IconArrowRoundTimeForwardRegular16 } from '@skbkontur/icons/IconArrowRoundTimeForwardRegular16';
import React from 'react';

import { Table } from '../src/components/Table/Table';

export default {
  title: 'Table/LeadingIcons',
};

const data = [
  {
    id: 1,
    name: 'ООО «Ромашка»',
    status: 'Ожидает',
    customer: 'Контур',
    driver: 'Иванов И.И.',
    vehicle: 'A123BC177',
    hasWarning: true,
  },
  {
    id: 2,
    name: 'ИП Петров В.С.',
    status: 'Подписан',
    customer: 'СКБ',
    driver: 'Петров В.С.',
    vehicle: 'B456DE177',
    hasWarning: false,
  },
  {
    id: 3,
    name: 'ООО «Логистик»',
    status: 'В пути',
    customer: 'Контур',
    driver: 'Сидоров А.А.',
    vehicle: 'C789FG177',
    hasWarning: true,
  },
];

const Container = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ width: 920, padding: 24 }}>
    <h2 style={{ margin: '0 0 16px' }}>{title}</h2>
    {children}
  </div>
);

export const WithOutsetIcon = () => (
  <Container title="Таблица с ведущей иконкой">
    <Table size="medium">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell noPaddingRight width="33px" />
          <Table.HeaderCell width="25%">Клиент</Table.HeaderCell>
          <Table.HeaderCell width="20%">Статус</Table.HeaderCell>
          <Table.HeaderCell width="20%">Заказчик</Table.HeaderCell>
          <Table.HeaderCell width="20%">Водитель</Table.HeaderCell>
          <Table.HeaderCell width="15%">Номер ТС</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id} bottomBorder>
            <Table.Cell noPaddingRight noBottomBorder>
              {row.hasWarning && (
                <div
                  style={{ width: 16, display: 'flex', alignItems: 'center', pointerEvents: 'auto', color: '#f97316' }}
                >
                  <IconArrowRoundTimeForwardRegular16 />
                </div>
              )}
            </Table.Cell>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
            <Table.Cell>{row.customer}</Table.Cell>
            <Table.Cell>{row.driver}</Table.Cell>
            <Table.Cell>{row.vehicle}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </Container>
);
