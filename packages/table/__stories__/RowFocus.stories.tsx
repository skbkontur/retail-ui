import { Table } from '@skbkontur/table';
import React from 'react';

export default {
  title: 'Table/Row Focus',
};

const rows = [
  { id: 1, name: 'Иван Петров', age: '25', city: 'Москва', salary: '50 000' },
  { id: 2, name: 'Мария Сидорова', age: '30', city: 'Санкт-Петербург', salary: '60 000' },
  { id: 3, name: 'Алексей Козлов', age: '28', city: 'Москва', salary: '55 000' },
];

/**
 * Колонки намеренно без явной ширины: при дефолтном `table-layout: fixed` таблица делит
 * свою ширину между ними поровну, поэтому любая лишняя ячейка в строке сразу сжимает
 * остальные — на этом и стоит creevey-тест, который следит, чтобы рамка клавиатурного
 * фокуса строки не добавляла в неё ячейку. Не ставить сюда
 * `auto`: при `table-layout: auto` колонки встают по контенту, лишняя ячейка ширины не
 * меняет и тест перестаёт ловить регрессию. Пустой `onClick` нужен, чтобы строки стали
 * кликабельными и получили табстоп.
 */
export const KeyboardFocus = () => (
  // Отступ вокруг таблицы нужен скриншотному тесту: рамка фокуса выходит за край строки,
  // и вплотную к краю кадра её срезало бы.
  <div style={{ padding: 8 }}>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Имя</Table.HeaderCell>
          <Table.HeaderCell scope="col">Возраст</Table.HeaderCell>
          <Table.HeaderCell scope="col">Город</Table.HeaderCell>
          <Table.HeaderCell scope="col" currency>
            Зарплата, ₽
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id} onClick={() => undefined}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.age}</Table.Cell>
            <Table.Cell>{row.city}</Table.Cell>
            <Table.Cell currency>{row.salary}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);
