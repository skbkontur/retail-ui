import React from 'react';

import { Table, useTableSort } from '..';

export default {
  title: 'Hooks/useTableSort',
};

export const SimpleSortExample = () => {
  const data = [
    { id: 1, name: 'Иван', city: 'Москва', score: 82 },
    { id: 2, name: 'Мария', city: 'СПб', score: 91 },
    { id: 3, name: 'Алексей', city: 'Казань', score: 75 },
    { id: 4, name: 'Елена', city: 'Москва', score: 88 },
    { id: 5, name: 'Дмитрий', city: 'СПб', score: 79 },
  ];

  const { sortedRows, sortConfig, handleSort } = useTableSort(data, { key: 'name', direction: 'asc' });

  const sortFor = (key: 'name' | 'city' | 'score') =>
    sortConfig.key === key ? (sortConfig.direction ?? undefined) : undefined;

  return (
    <div style={{ width: 520, padding: 12 }}>
      <h4>Сортировка по имени, городу и баллу</h4>
      <Table>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell width={'200px'}>
              <Table.Sort sortDirection={sortFor('name')} onSort={(direction) => handleSort('name', direction)}>
                Имя
              </Table.Sort>
            </Table.HeaderCell>
            <Table.HeaderCell width={'160px'}>
              <Table.Sort sortDirection={sortFor('city')} onSort={(direction) => handleSort('city', direction)}>
                Город
              </Table.Sort>
            </Table.HeaderCell>
            <Table.HeaderCell width={'120px'}>
              <Table.Sort sortDirection={sortFor('score')} onSort={(direction) => handleSort('score', direction)}>
                Балл
              </Table.Sort>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.city}</Table.Cell>
              <Table.Cell>{row.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
