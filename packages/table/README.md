# Table

Компонентная библиотека для создания интерактивных таблиц с поддержкой фильтрации, сортировки, выбора строк и действий.

## Установка

```bash
npm install @skbkontur/table
# или
yarn add @skbkontur/table
```

## Быстрый старт

Пример создания таблицы с фильтрацией, сортировкой и выбором строк.

```tsx
import React from 'react';
import { Table, useTableFilters, useTableSort, useTableRowSelection, TableFilterResultRow } from '@skbkontur/table';

const data = [
  { id: 1, name: 'Иван Петров', age: 25, city: 'Москва', salary: 50000 },
  { id: 2, name: 'Мария Сидорова', age: 30, city: 'Санкт-Петербург', salary: 60000 },
  { id: 3, name: 'Алексей Козлов', age: 28, city: 'Москва', salary: 55000 },
  { id: 4, name: 'Елена Волкова', age: 32, city: 'Новосибирск', salary: 45000 },
];

const columnConfig = [
  {
    key: 'name',
    accessor: (row) => row.name,
    stringifier: (value) => value,
    predicate: (filterValues, value) => filterValues.length === 0 || filterValues.includes(value),
    label: 'Имя',
  },
  {
    key: 'age',
    accessor: (row) => row.age,
    stringifier: (value) => value.toString(),
    predicate: (filterValues, value) => filterValues.length === 0 || filterValues.includes(value.toString()),
    label: 'Возраст',
  },
  {
    key: 'city',
    accessor: (row) => row.city,
    stringifier: (value) => value,
    predicate: (filterValues, value) => filterValues.length === 0 || filterValues.includes(value),
    label: 'Город',
  },
  {
    key: 'salary',
    accessor: (row) => row.salary,
    stringifier: (value) => value.toLocaleString('ru-RU'),
    predicate: (filterValues, value) => filterValues.length === 0 || filterValues.includes(value.toLocaleString('ru-RU')),
    label: 'Зарплата, ₽',
  },
];

export const MyTable = () => {
  const {
    filters: columnFilters,
    setFilter,
    uniqueValues,
    filteredRows,
    resetFilters,
    convertFiltersToTokens,
  } = useTableFilters(data, columnConfig);

  const { sortedRows, sortConfig, handleSort } = useTableSort(filteredRows, { direction: 'asc' });

  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(sortedRows);

  const filterTokens = convertFiltersToTokens();
  const selectedNames = (columnFilters.get('name') as string[]) ?? [];

  return (
    <Table hasChecked={hasChecked}>
      <Table.Header sticky>
        <Table.Row>
          <Table.HeaderCheckboxCell
            checkboxRef={checkboxRef}
            onClick={() => selectAll()}
            checked={isCheckedAll}
            initialIndeterminate={hasChecked}
            aria-label="Выбрать все строки"
          />
          <Table.HeaderCell width={'200px'}>
            <Table.DropdownSortableFilter
              options={uniqueValues.name}
              selectedOptions={selectedNames}
              onSelect={(selected) => setFilter('name', selected)}
              onSort={(direction) => handleSort('name', direction)}
              sorted={sortConfig.key === 'name' ? sortConfig.direction ?? undefined : undefined}
            >
              Имя
              {selectedNames.length > 0 && ` (${selectedNames.length})`}
            </Table.DropdownSortableFilter>
          </Table.HeaderCell>
          <Table.HeaderCell width={'100px'}>
            <Table.DropdownFilter
              options={uniqueValues.age}
              selectedOptions={(columnFilters.get('age') as string[]) ?? []}
              onSelect={(selected) => setFilter('age', selected)}
            >
              Возраст
            </Table.DropdownFilter>
          </Table.HeaderCell>
          <Table.HeaderCell width={'150px'}>
            <Table.DropdownFilter
              options={uniqueValues.city}
              selectedOptions={(columnFilters.get('city') as string[]) ?? []}
              onSelect={(selected) => setFilter('city', selected)}
            >
              Город
            </Table.DropdownFilter>
          </Table.HeaderCell>
          <Table.HeaderCell currency width={'120px'}>
            <Table.DropdownFilter
              options={uniqueValues.salary}
              selectedOptions={(columnFilters.get('salary') as string[]) ?? []}
              onSelect={(selected) => setFilter('salary', selected)}
            >
              Зарплата, ₽
            </Table.DropdownFilter>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {filterTokens.length > 0 && <TableFilterResultRow tokens={filterTokens} onResetAll={resetFilters} />}
        {sortedRows.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={5}>Нет данных, соответствующих вашему запросу.</Table.Cell>
          </Table.Row>
        ) : (
          sortedRows.map((row) => (
            <Table.Row key={row.id} checked={checkedRows.has(row.id)}>
              <Table.CheckboxCell
                checked={isRowChecked(row.id)}
                onCheckboxClick={(e) => toggleRow(e, row.id)}
                aria-label={`Выбрать строку ${row.name}`}
              />
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.age}</Table.Cell>
              <Table.Cell>{row.city}</Table.Cell>
              <Table.Cell currency>{row.salary.toLocaleString('ru-RU')}</Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
      <Table.Footer sticky>
        <Table.Row>
          <Table.Cell colSpan={5}>
            <p>
              Показано {sortedRows.length} из {data.length} записей
            </p>
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
```

## Основные возможности

- **Интерактивные таблицы**: Поддержка кликов по строкам, выделения и взаимодействия.
- **Фильтрация и Сортировка**: Встроенные хуки `useTableFilters` и `useTableSort` для легкой настройки.
- **Выбор строк**: Хук `useTableRowSelection` для управления чекбоксами и массовыми действиями.
- **Действия (Actions)**: Компонент `Table.ActionBar` для кнопок, меню и kebab-действий.
- **Адаптивность**: Ширина колонок в `px`, `%`, `fr`. Поддержка автоматического режима `auto` и прокрутки.
- **Sticky Header/Footer**: Липкие заголовки и подвалы таблицы.
- **Многоуровневые заголовки**: Объединение ячеек через `rowSpan` и `colSpan`.
- **Типизация**: Полная поддержка TypeScript.

## Компоненты

Все компоненты доступны через `Table.*` (например, `Table.Header`, `Table.Row`).

### Table
Основной контейнер таблицы.
- `hasChecked?: boolean` — резервирует место под колонку с чекбоксами.
- `auto?: boolean` — включает автоматическое изменение размера таблицы (table-layout: auto).
- `size?: 'small' | 'medium' | 'large'` — размер отступов.

### Структура (Header, Body, Footer)
- `Table.Header`, `Table.Body`, `Table.Footer` — семантические контейнеры.
- `sticky?: boolean` — для Header/Footer, фиксирует их при скролле.

### Ячейки и Строки
- `Table.Row`: `checked`, `onClick`.
- `Table.Cell`, `Table.HeaderCell`: `width`, `colSpan`, `rowSpan`, `currency` (выравнивание по правому краю), `noWrap`, `vAlign` (только HeaderCell).
- `Table.CheckboxCell`, `Table.HeaderCheckboxCell`: Специализированные ячейки для чекбоксов.

### Фильтры
- `Table.DropdownFilter`: Выпадающий список для фильтрации.
- `Table.DropdownSortableFilter`: Выпадающий список с возможностью сортировки.
- `Table.FilterResultRow`: Строка отображения выбранных фильтров с кнопкой сброса.

### Действия (ActionBar)
Компонент `Table.ActionBar` позволяет создавать панели действий в ячейках.

```tsx
<Table.ActionBar
  items={[
    {
      icon: <SendIcon />,
      text: 'Отправить',
      onClick: () => handleSend(),
    },
    // ...
  ]}
  popup={true} // Свернуть в kebab-меню
/>
```

## Хуки

### useTableFilters
Управляет состоянием фильтров. Принимает данные и конфигурацию колонок.
Возвращает: `filters`, `setFilter`, `uniqueValues`, `filteredRows` и др.

### useTableSort
Управляет сортировкой. Принимает отфильтрованные строки.
Возвращает: `sortedRows`, `handleSort`, `sortConfig`.

### useTableRowSelection
Управляет выбором строк.
Возвращает: `checkedRows`, `isCheckedAll`, `hasChecked`, `checkboxRef`, `selectAll`, `toggleRow`.

## Дополнительная документация

Подробные примеры использования можно найти в Storybook проекта, в разделе `Table`.
Также смотрите файл примеров: `packages/table/__docs__/TableConstructor.docs.stories.tsx`.

## Лицензия

MIT