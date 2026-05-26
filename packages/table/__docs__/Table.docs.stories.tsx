import { EmptyState } from '@skbkontur/empty-state';
import { IconArrowCDownRegular16 } from '@skbkontur/icons/IconArrowCDownRegular16';
import { IconArrowCRightRegular16 } from '@skbkontur/icons/IconArrowCRightRegular16';
import { IconDocsPlusRegular16 } from '@skbkontur/icons/IconDocsPlusRegular16';
import { IconDocsPlusRegular20 } from '@skbkontur/icons/IconDocsPlusRegular20';
import { IconDocsPlusRegular24 } from '@skbkontur/icons/IconDocsPlusRegular24';
import { IconMoneyTypeCoinsRegular16 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular16';
import { IconMoneyTypeCoinsRegular20 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular20';
import { IconMoneyTypeCoinsRegular24 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular24';
import { IconNetDownloadRegular16 } from '@skbkontur/icons/IconNetDownloadRegular16';
import { IconNetDownloadRegular20 } from '@skbkontur/icons/IconNetDownloadRegular20';
import { IconNetDownloadRegular24 } from '@skbkontur/icons/IconNetDownloadRegular24';
import { IconSendPaperplaneRegular16 } from '@skbkontur/icons/IconSendPaperplaneRegular16';
import { IconSendPaperplaneRegular20 } from '@skbkontur/icons/IconSendPaperplaneRegular20';
import { IconSendPaperplaneRegular24 } from '@skbkontur/icons/IconSendPaperplaneRegular24';
import { IconTechPrinterRegular16 } from '@skbkontur/icons/IconTechPrinterRegular16';
import { IconTechPrinterRegular20 } from '@skbkontur/icons/IconTechPrinterRegular20';
import { IconTechPrinterRegular24 } from '@skbkontur/icons/IconTechPrinterRegular24';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import { IconTrashCanRegular20 } from '@skbkontur/icons/IconTrashCanRegular20';
import { IconTrashCanRegular24 } from '@skbkontur/icons/IconTrashCanRegular24';
import { IconXCircleSolid64 } from '@skbkontur/icons/IconXCircleSolid64';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Paging } from '@skbkontur/react-ui/components/Paging';
import { Select } from '@skbkontur/react-ui/components/Select';
import React from 'react';

import { initialData } from '../__stories__/data';
import { Table, useTableFilters, useTableSort, useTableRowSelection } from '../index';

export default {
  title: 'Table',
};

export const CheckeredExampleStory = () => {
  const getSelectedOptions = (filters: Map<string, string[]>, key: string): string[] => {
    return filters.get(key) ?? [];
  };

  const memoizedInitialData = React.useMemo(() => initialData, []);
  type TableRow = (typeof initialData)[number];
  const columnConfig = [
    {
      key: 'client',
      accessor: (row: TableRow) => row.client,
      stringify: (value: string) => value,
      label: 'Клиент',
    },
    {
      key: 'region',
      accessor: (row: TableRow) => row.region,
      stringify: (value: string) => value,
      label: 'Регион',
    },
    {
      key: 'amount',
      accessor: (row: TableRow) => row.amount,
      stringify: (value: number) => value.toLocaleString('ru-RU'),
      label: 'Сумма, ₽',
    },
    {
      key: 'responsibleName',
      accessor: (row: TableRow) => row.responsible.name,
      stringify: (value: string) => value,
      label: 'Ответственный',
    },
  ];

  const {
    filters: columnFilters,
    setFilter,
    uniqueValues,
    filteredRows: filteredData,
    resetFilters,
    convertFiltersToTokens,
  } = useTableFilters<TableRow, string>(memoizedInitialData, columnConfig);
  const filterTokens = convertFiltersToTokens();
  const { sortedRows, sortConfig, handleSort } = useTableSort(filteredData, { direction: 'asc' });

  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(sortedRows as TableRow[]);

  const handleRowClick = React.useCallback((rowId: number) => {
    console.log(`Клик по строке: ${rowId}`);
  }, []);

  return (
    <div style={{ width: '900px', maxHeight: '640px', margin: '10px', overflow: 'auto' }}>
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
            <Table.HeaderCell width={'33.33%'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.client}
                selectedOptions={getSelectedOptions(columnFilters, 'client')}
                onSelect={(selected: string[]) => setFilter('client', selected)}
                onSort={(direction) => handleSort('client', direction)}
                sortDirection={sortConfig.key === 'client' ? sortConfig.direction : undefined}
              >
                Клиент
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>

            <Table.HeaderCell width={'33.33%'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.region}
                selectedOptions={getSelectedOptions(columnFilters, 'region')}
                onSelect={(selected: string[]) => setFilter('region', selected)}
                onSort={(direction) => handleSort('region', direction)}
                sortDirection={sortConfig.key === 'region' ? sortConfig.direction : undefined}
              >
                Регион
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
            <Table.HeaderCell currency width={'33.33%'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.amount}
                selectedOptions={getSelectedOptions(columnFilters, 'amount')}
                onSelect={(selected: string[]) => setFilter('amount', selected)}
                onSort={(direction) => handleSort('amount', direction)}
                sortDirection={sortConfig.key === 'amount' ? sortConfig.direction : undefined}
              >
                Сумма, ₽
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
            <Table.HeaderCell width={'300px'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.responsibleName}
                selectedOptions={getSelectedOptions(columnFilters, 'responsibleName')}
                onSelect={(selected: string[]) => setFilter('responsibleName', selected)}
                onSort={(direction) => handleSort('responsible', direction)}
                sortDirection={sortConfig.key === 'responsible' ? sortConfig.direction : undefined}
              >
                Ответственный
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filterTokens.length > 0 && (
            <Table.FilterResultRow tokens={filterTokens} onResetAll={resetFilters}>
              <Table.Cell>Фильтры</Table.Cell>
            </Table.FilterResultRow>
          )}
          {sortedRows.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5}>Нет данных, соответствующих вашему запросу.</Table.Cell>
            </Table.Row>
          ) : (
            sortedRows.map((row) => (
              <Table.Row checked={checkedRows.has(row.id)} key={row.id} onClick={() => handleRowClick(row.id)}>
                <Table.CheckboxCell
                  checked={isRowChecked(row.id)}
                  onCheckboxClick={(e) => toggleRow(e, row.id)}
                  aria-label={`Выбрать строку ${row.client}`}
                />
                <Table.Cell>{row.client}</Table.Cell>
                <Table.Cell>{row.region}</Table.Cell>
                <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
                <Table.Cell>
                  {row.responsible.name}
                  <Table.ActionBar
                    popup
                    items={[
                      {
                        icon: <IconSendPaperplaneRegular16 />,
                        text: 'Отправить',
                        onClick: () => console.log('send'),
                      },
                      {
                        icon: <IconTechPrinterRegular16 />,
                        text: 'Напечатать',
                        onClick: () => console.log('print'),
                      },
                      {
                        icon: <IconDocsPlusRegular16 />,
                        text: 'Скопировать',
                        onClick: () => console.log('copy'),
                      },
                      {
                        icon: <IconMoneyTypeCoinsRegular16 />,
                        text: 'Уплатить',
                        onClick: () => console.log('pay'),
                      },
                      {
                        icon: <IconNetDownloadRegular16 />,
                        text: 'Скачать',
                        onClick: () => console.log('download'),
                      },
                      {
                        icon: <IconTrashCanRegular16 />,
                        text: 'Удалить',
                        onClick: () => console.log('delete'),
                      },
                    ]}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell colSpan={5}>
              <p>
                Показано {sortedRows.length} из {memoizedInitialData.length} записей
              </p>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};
export const AwesomeExample = () => {
  const data = [
    {
      id: 1,
      client: 'ООО «Кавычки»',
      clientType: 'Организация',
      phone: '8(910)555-35-35',
      email: 'billing@kavychki.example',
      channel: 'Telegram',
      date: '14.10.2025 03:34',
      region: 'Курская обл 46',
      amount: 85000,
      responsible: { name: 'Антон Чехов' },
    },
    {
      id: 2,
      client: 'Рыков Н. В.',
      clientType: 'Физлицо',
      phone: '8(910)555-35-35',
      email: 'rykov@example.ru',
      channel: 'Viber',
      date: '14.10.2025 03:34',
      region: 'Хакасия 19',
      amount: 127000,
      responsible: { name: 'Алексей Толстой' },
    },
  ];
  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(data);
  return (
    <div style={{ width: '1200px' }}>
      <Table hasChecked={hasChecked}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCheckboxCell
              checkboxRef={checkboxRef}
              onClick={() => selectAll()}
              checked={isCheckedAll}
              initialIndeterminate={hasChecked}
              aria-label="Выбрать все строки"
            />
            <Table.HeaderCell>Клиент</Table.HeaderCell>
            <Table.HeaderCell>Тип клиента</Table.HeaderCell>
            <Table.HeaderCell width={'150px'}>Телефон</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
            <Table.HeaderCell>Канал</Table.HeaderCell>
            <Table.HeaderCell>Дата</Table.HeaderCell>
            <Table.HeaderCell>Регион</Table.HeaderCell>
            <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
            <Table.HeaderCell>Ответственный</Table.HeaderCell>
            <Table.HeaderCell width={'200px'} />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id} checked={checkedRows.has(row.id)}>
              <Table.CheckboxCell
                checked={isRowChecked(row.id)}
                onCheckboxClick={(e) => toggleRow(e, row.id)}
                aria-label={`Выбрать строку ${row.client}`}
              />
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell>{row.clientType}</Table.Cell>
              <Table.Cell noWrap>{row.phone}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell>{row.channel}</Table.Cell>
              <Table.Cell>{row.date}</Table.Cell>
              <Table.Cell>{row.region}</Table.Cell>
              <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
              <Table.Cell>{row.responsible.name}</Table.Cell>
              <Table.Cell>
                <Table.ActionBar
                  items={[
                    {
                      icon: <IconSendPaperplaneRegular16 />,
                      text: 'Отправить',
                      onClick: () => console.log('send'),
                    },
                    {
                      icon: <IconTechPrinterRegular16 />,
                      text: 'Напечатать',
                      onClick: () => console.log('print'),
                    },
                    {
                      icon: <IconDocsPlusRegular16 />,
                      text: 'Скопировать',
                      onClick: () => console.log('copy'),
                    },
                    {
                      icon: <IconMoneyTypeCoinsRegular16 />,
                      text: 'Уплатить',
                      onClick: () => console.log('pay'),
                    },
                    {
                      icon: <IconNetDownloadRegular16 />,
                      text: 'Скачать',
                      onClick: () => console.log('download'),
                    },
                    {
                      icon: <IconTrashCanRegular16 />,
                      text: 'Удалить',
                      onClick: () => console.log('delete'),
                    },
                  ]}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell colSpan={11}>
              <p>Показано {data.length} записей</p>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export const AwesomeExampleAutoResizing = () => {
  const data = [
    {
      id: 1,
      client: 'ООО «Кавычки»',
      clientType: 'Организация',
      phone: '8(910)555-35-35',
      email: 'billing@kavychki.example',
      channel: 'Telegram',
      date: '14.10.2025 03:34',
      region: 'Курская обл 46',
      amount: 85000,
      responsible: { name: 'Антон Чехов' },
    },
    {
      id: 2,
      client: 'Рыков Н. В.',
      clientType: 'Физлицо',
      phone: '8(910)555-35-35',
      email: 'rykov@example.ru',
      channel: 'Viber',
      date: '14.10.2025 03:34',
      region: 'Хакасия 19',
      amount: 127000,
      responsible: { name: 'Алексей Толстой' },
    },
  ];
  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(data);
  return (
    <Table auto hasChecked={hasChecked}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCheckboxCell
            checkboxRef={checkboxRef}
            onClick={() => selectAll()}
            checked={isCheckedAll}
            initialIndeterminate={hasChecked}
            aria-label="Выбрать все строки"
          />
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>Тип клиента</Table.HeaderCell>
          <Table.HeaderCell>Телефон</Table.HeaderCell>
          <Table.HeaderCell>E-mail</Table.HeaderCell>
          <Table.HeaderCell>Канал</Table.HeaderCell>
          <Table.HeaderCell>Дата</Table.HeaderCell>
          <Table.HeaderCell>Регион</Table.HeaderCell>
          <Table.HeaderCell>Сумма, ₽</Table.HeaderCell>
          <Table.HeaderCell>Ответственный</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id} checked={checkedRows.has(row.id)}>
            <Table.CheckboxCell
              checked={isRowChecked(row.id)}
              onCheckboxClick={(e) => toggleRow(e, row.id)}
              aria-label={`Выбрать строку ${row.client}`}
            />
            <Table.Cell>{row.client}</Table.Cell>
            <Table.Cell>{row.clientType}</Table.Cell>
            <Table.Cell noWrap>{row.phone}</Table.Cell>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Cell>{row.channel}</Table.Cell>
            <Table.Cell>{row.date}</Table.Cell>
            <Table.Cell>{row.region}</Table.Cell>
            <Table.Cell>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
            <Table.Cell>{row.responsible.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const MultiHeadersExample = () => {
  const data = [
    {
      id: 1,
      client: 'ООО «Кавычки»',
      phone: '8 (910) 555-35-35',
      email: 'billing@kavychki.example',
      channel: 'Telegram',
      responsible: { name: 'Антон Чехов' },
    },
    {
      id: 2,
      client: 'Рыков Н. В.',
      phone: '8 (910) 555-35-35',
      email: 'rykov@example.ru',
      channel: 'Viber',
      responsible: { name: 'Алексей Толстой' },
    },
  ];
  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(data);
  return (
    <div style={{ width: '1200px' }}>
      <Table hasChecked={hasChecked}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCheckboxCell
              rowSpan={2}
              checkboxRef={checkboxRef}
              onClick={() => selectAll()}
              checked={isCheckedAll}
              initialIndeterminate={hasChecked}
              aria-label="Выбрать все строки"
            />
            <Table.HeaderCell rowSpan={2}>Клиент</Table.HeaderCell>
            <Table.HeaderCell colSpan={2} bottomBorder>
              Контакты
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan={2}>Ответственный</Table.HeaderCell>
            <Table.HeaderCell rowSpan={2}>Канал</Table.HeaderCell>
            <Table.HeaderCell rowSpan={2} width="80px" />
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Телефон</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id} checked={checkedRows.has(row.id)}>
              <Table.CheckboxCell
                checked={isRowChecked(row.id)}
                onCheckboxClick={(e) => toggleRow(e, row.id)}
                aria-label={`Выбрать строку ${row.client}`}
              />
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell noWrap>{row.phone}</Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell>{row.responsible.name}</Table.Cell>
              <Table.Cell>{row.channel}</Table.Cell>
              <Table.Cell>
                <Table.ActionBar
                  items={[
                    {
                      icon: <IconTechPrinterRegular16 />,
                      text: 'Напечатать',
                      onClick: () => console.log('print'),
                    },
                    {
                      icon: <IconTrashCanRegular16 />,
                      text: 'Удалить',
                      onClick: () => console.log('del'),
                    },
                  ]}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const BasicTableExample = () => {
  const data = [
    { id: 1, name: 'Иван Петров', age: 25, city: 'Москва', salary: 50000 },
    { id: 2, name: 'Мария Сидорова', age: 30, city: 'Санкт-Петербург', salary: 60000 },
    { id: 3, name: 'Алексей Козлов', age: 28, city: 'Москва', salary: 55000 },
    { id: 4, name: 'Елена Волкова', age: 32, city: 'Новосибирск', salary: 45000 },
  ];

  const columnConfig = [
    {
      key: 'name',
      accessor: (row: (typeof data)[0]) => row.name,
      stringify: (value: string) => value,
      label: 'Имя',
    },
    {
      key: 'age',
      accessor: (row: (typeof data)[0]) => row.age,
      stringify: (value: number) => value.toString(),
      label: 'Возраст',
    },
    {
      key: 'city',
      accessor: (row: (typeof data)[0]) => row.city,
      stringify: (value: string) => value,
      label: 'Город',
    },
    {
      key: 'salary',
      accessor: (row: (typeof data)[0]) => row.salary,
      stringify: (value: number) => value.toLocaleString('ru-RU'),
      label: 'Зарплата, ₽',
    },
  ];

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

  const handleRowClick = React.useCallback((rowId: number) => {
    console.log(`Клик по строке: ${rowId}`);
  }, []);

  const filterTokens = convertFiltersToTokens();
  const selectedNames = (columnFilters.get('name') as string[]) ?? [];

  return (
    <div style={{ width: '800px', margin: '10px' }}>
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
                onSelect={(selected: string[]) => setFilter('name', selected)}
                onSort={(direction) => handleSort('name', direction)}
                sortDirection={sortConfig.key === 'name' ? (sortConfig.direction ?? undefined) : undefined}
              >
                Имя
                {selectedNames.length > 0 && ` (${selectedNames.length})`}
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>
            <Table.HeaderCell width={'100px'}>
              <Table.DropdownFilter
                options={uniqueValues.age}
                selectedOptions={(columnFilters.get('age') as string[]) ?? []}
                onSelect={(selected: string[]) => setFilter('age', selected)}
              >
                Возраст
              </Table.DropdownFilter>
            </Table.HeaderCell>
            <Table.HeaderCell width={'150px'}>
              <Table.DropdownFilter
                options={uniqueValues.city}
                selectedOptions={(columnFilters.get('city') as string[]) ?? []}
                onSelect={(selected: string[]) => setFilter('city', selected)}
              >
                Город
              </Table.DropdownFilter>
            </Table.HeaderCell>
            <Table.HeaderCell currency width={'120px'}>
              <Table.DropdownFilter
                options={uniqueValues.salary}
                selectedOptions={(columnFilters.get('salary') as string[]) ?? []}
                onSelect={(selected: string[]) => setFilter('salary', selected)}
              >
                Зарплата, ₽
              </Table.DropdownFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filterTokens.length > 0 && (
            <Table.FilterResultRow colSpan={5} tokens={filterTokens} onResetAll={resetFilters} />
          )}
          {sortedRows.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5}>Нет данных, соответствующих вашему запросу.</Table.Cell>
            </Table.Row>
          ) : (
            sortedRows.map((row) => (
              <Table.Row
                key={row.id}
                onClick={() => handleRowClick(row.id)}
                checked={checkedRows.has(row.id)}
                bottomBorder
              >
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
    </div>
  );
};

export const StickyHeaderFooterExample = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Пользователь ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: ['Активен', 'Неактивен', 'Заблокирован'][i % 3],
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU'),
  }));

  return (
    <div style={{ width: '700px', height: '300px', overflow: 'auto' }}>
      <Table>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell width={'200px'}>Имя</Table.HeaderCell>
            <Table.HeaderCell width={'120px'}>Статус</Table.HeaderCell>
            <Table.HeaderCell width={'150px'}>Последний вход</Table.HeaderCell>
            <Table.HeaderCell width={'100px'}>Действия</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id} bottomBorder>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.status}</Table.Cell>
              <Table.Cell>{row.lastLogin}</Table.Cell>
              <Table.Cell>
                <Table.ActionBar
                  items={[
                    {
                      icon: <IconSendPaperplaneRegular16 />,
                      text: 'Отправить',
                      onClick: () => console.log('send', row.id),
                    },
                    {
                      icon: <IconTrashCanRegular16 />,
                      text: 'Удалить',
                      onClick: () => console.log('delete', row.id),
                      danger: true,
                    },
                  ]}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell colSpan={4}>
              <p>Всего пользователей: {data.length}</p>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export const CurrencyFormattingExample = () => {
  const data = [
    { id: 1, product: 'Ноутбук', price: 75000, quantity: 2, total: 150000 },
    { id: 2, product: 'Мышь', price: 1500, quantity: 5, total: 7500 },
    { id: 3, product: 'Клавиатура', price: 3500, quantity: 3, total: 10500 },
    { id: 4, product: 'Монитор', price: 25000, quantity: 1, total: 25000 },
  ];

  return (
    <div style={{ width: '700px', margin: '10px' }}>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={'200px'}>Товар</Table.HeaderCell>
            <Table.HeaderCell currency width={'120px'}>
              Цена, ₽
            </Table.HeaderCell>
            <Table.HeaderCell width={'100px'}>Количество</Table.HeaderCell>
            <Table.HeaderCell currency width={'120px'}>
              Сумма, ₽
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.product}</Table.Cell>
              <Table.Cell currency>{row.price.toLocaleString('ru-RU')}</Table.Cell>
              <Table.Cell>{row.quantity}</Table.Cell>
              <Table.Cell currency>{row.total.toLocaleString('ru-RU')}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={3}>
              <strong>Итого:</strong>
            </Table.Cell>
            <Table.Cell currency>
              <strong>{data.reduce((sum, row) => sum + row.total, 0).toLocaleString('ru-RU')}</strong>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export const PaginationExample = () => {
  const pageSize = 5;
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(initialData.length / pageSize);
  const pageData = React.useMemo(() => initialData.slice((page - 1) * pageSize, page * pageSize), [page]);

  return (
    <div style={{ width: 900 }}>
      <Table auto>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>Клиент</Table.HeaderCell>
            <Table.HeaderCell>Регион</Table.HeaderCell>
            <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pageData.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell>{row.region}</Table.Cell>
              <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell colSpan={3}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span>
                  Страница {page} из {pages}
                </span>
                <Paging activePage={page} pagesCount={pages} onPageChange={setPage} />
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export const ExpandableRowsExample = () => {
  const [expanded, setExpanded] = React.useState<Set<number>>(new Set());
  const toggle = (id: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

  const data = initialData.slice(0, 5);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width="32px" />
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>Регион</Table.HeaderCell>
          <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => {
          const isExpanded = expanded.has(row.id);
          return (
            <React.Fragment key={row.id}>
              <Table.Row onClick={() => toggle(row.id)}>
                <Table.Cell>{isExpanded ? <IconArrowCDownRegular16 /> : <IconArrowCRightRegular16 />}</Table.Cell>
                <Table.Cell>{row.client}</Table.Cell>
                <Table.Cell>{row.region}</Table.Cell>
                <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
              </Table.Row>
              {isExpanded && (
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell colSpan={3}>
                    <Table size="small">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Ответственный</Table.HeaderCell>
                          <Table.HeaderCell>Регион</Table.HeaderCell>
                          <Table.HeaderCell>Комментарий</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>{row.responsible.name}</Table.Cell>
                          <Table.Cell>{row.region}</Table.Cell>
                          <Table.Cell>Дополнительная информация недоступна</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export const EmptyErrorStateExample = () => {
  type Mode = 'data' | 'empty' | 'error';
  const [mode, setMode] = React.useState<Mode>('data');
  const rows = mode === 'data' ? initialData.slice(0, 4) : [];
  const columnsCount = 3;

  return (
    <div style={{ width: 720, display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => setMode('data')} disabled={mode === 'data'}>
          Данные
        </Button>
        <Button onClick={() => setMode('empty')} disabled={mode === 'empty'}>
          Пусто
        </Button>
        <Button onClick={() => setMode('error')} disabled={mode === 'error'}>
          Ошибка
        </Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Клиент</Table.HeaderCell>
            <Table.HeaderCell>Регион</Table.HeaderCell>
            <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mode === 'data' &&
            rows.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.client}</Table.Cell>
                <Table.Cell>{row.region}</Table.Cell>
                <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
              </Table.Row>
            ))}

          {mode !== 'data' && (
            <Table.Row>
              <Table.Cell colSpan={columnsCount}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                  {mode === 'empty' ? (
                    <EmptyState use="empty">
                      <EmptyState.Header>Данных нет</EmptyState.Header>
                      <EmptyState.Body>Попробуйте изменить параметры фильтра или добавьте новые записи</EmptyState.Body>
                    </EmptyState>
                  ) : (
                    <EmptyState use="status">
                      <EmptyState.Header icon={<IconXCircleSolid64 color="#FE4C4C" />}>
                        Не удалось загрузить данные
                      </EmptyState.Header>
                      <EmptyState.Body>Произошла ошибка при загрузке. Попробуйте обновить страницу</EmptyState.Body>
                    </EmptyState>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
export const FooterExample = () => {
  const organizationData = [
    {
      id: 1,
      organization: 'ООО «Цветочки»',
      january: 12450,
      february: 23450,
      march: 34670,
    },
    {
      id: 2,
      organization: 'ООО «Ромашка»',
      january: 123560,
      february: 112450,
      march: 101240,
    },
    {
      id: 3,
      organization: 'ООО «Василек»',
      january: 89020,
      february: 90130,
      march: 78010,
    },
    {
      id: 4,
      organization: 'ООО «Анютины глазки»',
      january: 67900,
      february: 56780,
      march: 45680,
    },
  ];

  const formatMoney = (num: number) =>
    num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const totals = organizationData.reduce(
    (acc, row) => ({
      january: acc.january + row.january,
      february: acc.february + row.february,
      march: acc.march + row.march,
    }),
    { january: 0, february: 0, march: 0 }
  );

  return (
    <div style={{ height: '240px', overflow: 'auto' }}>
      <Table size="medium">
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell width="40px" />
            <Table.HeaderCell width="250px">Контрагент</Table.HeaderCell>
            <Table.HeaderCell width="150px" currency>
              Январь, ₽
            </Table.HeaderCell>
            <Table.HeaderCell width="150px" currency>
              Февраль, ₽
            </Table.HeaderCell>
            <Table.HeaderCell width="150px" currency>
              Март, ₽
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {organizationData.map((row, index) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                {index === 0 && <IconDocsPlusRegular16 />}
                {index === 2 && <IconTechPrinterRegular16 />}
              </Table.Cell>
              <Table.Cell>
                <strong>{row.organization}</strong>
              </Table.Cell>
              <Table.Cell currency>{formatMoney(row.january)}</Table.Cell>
              <Table.Cell currency>{formatMoney(row.february)}</Table.Cell>
              <Table.Cell currency>{formatMoney(row.march)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell />
            <Table.Cell>
              <strong>Итого</strong>
            </Table.Cell>
            <Table.Cell currency>
              <strong>{formatMoney(totals.january)}</strong>
            </Table.Cell>
            <Table.Cell currency>
              <strong>{formatMoney(totals.february)}</strong>
            </Table.Cell>
            <Table.Cell currency>
              <strong>{formatMoney(totals.march)}</strong>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export const GroupedHeadersExample = () => {
  const salesData = [
    {
      id: 1,
      organization: 'ООО «Ромашка»',
      rate18: 60000,
      rate10: 25000,
      totalAmount: 85000,
    },
    {
      id: 2,
      organization: 'ООО «Василек»',
      rate18: 92000,
      rate10: 35000,
      totalAmount: 127000,
    },
    {
      id: 3,
      organization: 'ООО «Анютины глазки»',
      rate18: 3500,
      rate10: 1500,
      totalAmount: 5000,
    },
  ];

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const { sortedRows, sortConfig, handleSort } = useTableSort(salesData, { key: undefined, direction: 'asc' });

  return (
    <div style={{ width: '900px', margin: '10px' }}>
      <Table size="medium">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width="250px" rowSpan={2}>
              <Table.Sort
                sortDirection={sortConfig.key === 'organization' ? (sortConfig.direction ?? undefined) : undefined}
                onSort={(direction) => handleSort('organization', direction)}
              >
                Организация
              </Table.Sort>
            </Table.HeaderCell>
            <Table.HeaderCell width="150px" rowSpan={2} currency>
              <Table.Sort
                sortDirection={sortConfig.key === 'totalAmount' ? (sortConfig.direction ?? undefined) : undefined}
                onSort={(direction) => handleSort('totalAmount', direction)}
              >
                Общая сумма, ₽
              </Table.Sort>
            </Table.HeaderCell>
            <Table.HeaderCell width="300px" colSpan={2} bottomBorder>
              Стоимость продаж без НДС
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width="150px" currency>
              <Table.Sort
                sortDirection={sortConfig.key === 'rate18' ? (sortConfig.direction ?? undefined) : undefined}
                onSort={(direction) => handleSort('rate18', direction)}
              >
                По ставке 18 %
              </Table.Sort>
            </Table.HeaderCell>
            <Table.HeaderCell width="150px" currency>
              <Table.Sort
                sortDirection={sortConfig.key === 'rate10' ? (sortConfig.direction ?? undefined) : undefined}
                onSort={(direction) => handleSort('rate10', direction)}
              >
                По ставке 10 %
              </Table.Sort>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>
                <strong>{row.organization}</strong>
              </Table.Cell>
              <Table.Cell currency>{formatNumber(row.totalAmount)}</Table.Cell>
              <Table.Cell currency>{formatNumber(row.rate18)}</Table.Cell>
              <Table.Cell currency>{formatNumber(row.rate10)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export const SizeExampleStory = () => {
  const memoizedInitialData = React.useMemo(() => initialData, []);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [tableSize, setTableSize] = React.useState<'small' | 'medium' | 'large'>('small');
  const itemsPerPage = 10;
  type TableRow = (typeof initialData)[number];
  const columnConfig = [
    {
      key: 'client',
      accessor: (row: TableRow) => row.client,
      stringify: (value: string) => value,
      label: 'Клиент',
    },
    {
      key: 'region',
      accessor: (row: TableRow) => row.region,
      stringify: (value: string) => value,
      label: 'Регион',
    },
    {
      key: 'amount',
      accessor: (row: TableRow) => row.amount,
      stringify: (value: number) => value.toLocaleString('ru-RU'),
      label: 'Сумма, ₽',
    },
    {
      key: 'responsibleName',
      accessor: (row: TableRow) => row.responsible.name,
      stringify: (value: string) => value,
      label: 'Ответственный',
    },
  ];

  const {
    filters: columnFilters,
    setFilter,
    uniqueValues,
    filteredRows: filteredData,
    resetFilters,
    convertFiltersToTokens,
  } = useTableFilters<TableRow, string>(memoizedInitialData, columnConfig);
  const filterTokens = convertFiltersToTokens();
  const { sortedRows, sortConfig, handleSort } = useTableSort(filteredData, { key: undefined, direction: 'asc' });

  const totalPages = Math.ceil(sortedRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = sortedRows.slice(startIndex, endIndex);

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortedRows.length]);

  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked, setCheckedRows } =
    useTableRowSelection(paginatedRows as TableRow[]);

  React.useEffect(() => {
    setCheckedRows(new Set());
  }, [currentPage, setCheckedRows]);

  const handleRowClick = React.useCallback((rowId: number) => {
    console.log(`Клик по строке: ${rowId}`);
  }, []);

  const getIcon = React.useCallback(
    (Icon16: React.ComponentType, Icon20: React.ComponentType, Icon24: React.ComponentType) => {
      switch (tableSize) {
        case 'small':
          return <Icon16 />;
        case 'medium':
          return <Icon20 />;
        case 'large':
          return <Icon24 />;
        default:
          return <Icon20 />;
      }
    },
    [tableSize]
  );

  return (
    <div style={{ margin: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Select<'small' | 'medium' | 'large'>
          items={['small', 'medium', 'large']}
          value={tableSize}
          onValueChange={(value) => setTableSize(value)}
        />
      </div>
      {filterTokens.length > 0 && <Table.FilterResultRow tokens={filterTokens} onResetAll={resetFilters} />}
      <Table hasChecked={hasChecked} size={tableSize} width={'900px'}>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCheckboxCell
              checkboxRef={checkboxRef}
              onClick={() => selectAll()}
              checked={isCheckedAll}
              initialIndeterminate={hasChecked}
              aria-label="Выбрать все строки"
            />
            <Table.HeaderCell width={'33.33%'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.client}
                selectedOptions={columnFilters.get('client') ?? []}
                onSelect={(selected: string[]) => setFilter('client', selected)}
                onSort={(direction) => handleSort('client', direction)}
                sortDirection={sortConfig.key === 'client' ? (sortConfig.direction ?? undefined) : undefined}
              >
                Клиент
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>

            <Table.HeaderCell width={'33.33%'}>
              <Table.Sort
                onSort={(direction) => handleSort('region', direction)}
                sortDirection={sortConfig.key === 'region' ? (sortConfig.direction ?? undefined) : undefined}
                filtered={(columnFilters.get('region')?.length ?? 0) > 0}
              >
                Регион
              </Table.Sort>
            </Table.HeaderCell>
            <Table.HeaderCell currency width={'33.33%'}>
              <Table.DropdownFilter
                options={uniqueValues.amount}
                selectedOptions={columnFilters.get('amount') ?? []}
                onSelect={(selected: string[]) => setFilter('amount', selected)}
              >
                Сумма, ₽
              </Table.DropdownFilter>
            </Table.HeaderCell>
            <Table.HeaderCell width={'300px'}>Ответственный</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5}>Нет данных, соответствующих вашему запросу.</Table.Cell>
            </Table.Row>
          ) : (
            paginatedRows.map((row) => (
              <Table.Row
                bottomBorder
                checked={checkedRows.has(row.id)}
                key={row.id}
                onClick={() => handleRowClick(row.id)}
              >
                <Table.CheckboxCell
                  checked={isRowChecked(row.id)}
                  onCheckboxClick={(e) => toggleRow(e, row.id)}
                  aria-label={`Выбрать строку ${row.client}`}
                />
                <Table.Cell>{row.client}</Table.Cell>
                <Table.Cell>{row.region}</Table.Cell>
                <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
                <Table.Cell>
                  {row.responsible.name}
                  <Table.ActionBar
                    popup
                    items={[
                      {
                        icon: getIcon(
                          IconSendPaperplaneRegular16,
                          IconSendPaperplaneRegular20,
                          IconSendPaperplaneRegular24
                        ),
                        text: 'Отправить',
                        onClick: () => console.log('send'),
                      },
                      {
                        icon: getIcon(IconTechPrinterRegular16, IconTechPrinterRegular20, IconTechPrinterRegular24),
                        text: 'Напечатать',
                        onClick: () => console.log('print'),
                      },
                      {
                        icon: getIcon(IconDocsPlusRegular16, IconDocsPlusRegular20, IconDocsPlusRegular24),
                        text: 'Скопировать',
                        onClick: () => console.log('copy'),
                      },
                      {
                        icon: getIcon(
                          IconMoneyTypeCoinsRegular16,
                          IconMoneyTypeCoinsRegular20,
                          IconMoneyTypeCoinsRegular24
                        ),
                        text: 'Уплатить',
                        onClick: () => console.log('pay'),
                      },
                      {
                        icon: getIcon(IconNetDownloadRegular16, IconNetDownloadRegular20, IconNetDownloadRegular24),
                        text: 'Скачать',
                        onClick: () => console.log('download'),
                      },
                      {
                        icon: getIcon(IconTrashCanRegular16, IconTrashCanRegular20, IconTrashCanRegular24),
                        text: 'Удалить',
                        onClick: () => console.log('delete'),
                      },
                    ]}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell colSpan={5}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>
                  Показано {startIndex + 1}-{Math.min(endIndex, sortedRows.length)} из {sortedRows.length} записей.
                  Выбрано {checkedRows.size} из {sortedRows.length}
                </p>
                {totalPages > 1 && (
                  <Paging activePage={currentPage} pagesCount={totalPages} onPageChange={handlePageChange} />
                )}
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};
