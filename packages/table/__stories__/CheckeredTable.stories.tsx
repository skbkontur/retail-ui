import { IconDocsPlusRegular20 } from '@skbkontur/icons/IconDocsPlusRegular20';
import { IconMoneyTypeCoinsRegular20 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular20';
import { IconNetDownloadRegular20 } from '@skbkontur/icons/IconNetDownloadRegular20';
import { IconSendPaperplaneRegular20 } from '@skbkontur/icons/IconSendPaperplaneRegular20';
import { IconTechPrinterRegular20 } from '@skbkontur/icons/IconTechPrinterRegular20';
import { IconTrashCanRegular20 } from '@skbkontur/icons/IconTrashCanRegular20';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { Paging } from '@skbkontur/react-ui/components/Paging';
import { Select } from '@skbkontur/react-ui/components/Select';
import React, { useCallback, useState } from 'react';

import { Table, useTableRowSelection, useTableSort, useTableFilters } from '..';
import { initialData } from './data';

export default {
  title: 'Table/CheckeredTable',
};

export const CheckeredTableExampleStory = () => {
  const memoizedInitialData = React.useMemo(() => initialData, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableSize, setTableSize] = useState<'small' | 'medium' | 'large'>('small');
  const itemsPerPage = 10;
  type TableRow = (typeof initialData)[number];
  const columnConfig = [
    {
      key: 'client',
      accessor: (row: TableRow) => row.client,
      stringifier: (value: string) => value,
      predicate: (filterValues: string[], value: string) => filterValues.length === 0 || filterValues.includes(value),
      label: 'Клиент',
    },
    {
      key: 'region',
      accessor: (row: TableRow) => row.region,
      stringifier: (value: string) => value,
      predicate: (filterValues: string[], value: string) => filterValues.length === 0 || filterValues.includes(value),
      label: 'Регион',
    },
    {
      key: 'amount',
      accessor: (row: TableRow) => row.amount,
      stringifier: (value: number) => value.toLocaleString('ru-RU'),
      predicate: (filterValues: string[], value: number) =>
        filterValues.length === 0 || filterValues.includes(value.toLocaleString('ru-RU')),
      label: 'Сумма, ₽',
    },
    {
      key: 'responsibleName',
      accessor: (row: TableRow) => row.responsible.name,
      stringifier: (value: string) => value,
      predicate: (filterValues: string[], value: string) => filterValues.length === 0 || filterValues.includes(value),
      label: 'Ответственный',
    },
  ];

  const {
    filters: columnFilters,
    setFilter,
    uniqueValues,
    filteredRows: filteredData,
  } = useTableFilters<TableRow, string>(memoizedInitialData, columnConfig);
  const { sortedRows, sortConfig, handleSort } = useTableSort(filteredData, { direction: 'asc' });

  const totalPages = Math.ceil(sortedRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = sortedRows.slice(startIndex, endIndex);

  const handlePageChange = useCallback((page: number) => {
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

  return (
    <div style={{ width: '900px', margin: '10px' }}>
      <Select<'small' | 'medium' | 'large'>
        items={['small', 'medium', 'large']}
        value={tableSize}
        onValueChange={(value) => setTableSize(value)}
      />
      <Table hasChecked={hasChecked} size={tableSize}>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell checkboxCell>
              <Checkbox
                ref={checkboxRef}
                onClick={() => selectAll()}
                checked={isCheckedAll}
                initialIndeterminate={hasChecked}
              />
            </Table.HeaderCell>
            <Table.HeaderCell width={'33.33%'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.client}
                selectedOptions={columnFilters.get('client') ?? []}
                onSelect={(selected: string[]) => setFilter('client', selected)}
                onSort={(direction) => handleSort('client', direction)}
                sort={sortConfig.direction}
              >
                Клиент
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>

            <Table.HeaderCell width={'33.33%'}>
              <Table.DropdownFilter
                options={uniqueValues.region}
                selectedOptions={columnFilters.get('region') ?? []}
                onSelect={(selected: string[]) => setFilter('region', selected)}
                onSort={(direction) => handleSort('region', direction)}
              >
                Регион
              </Table.DropdownFilter>
            </Table.HeaderCell>
            <Table.HeaderCell currency width={'33.33%'}>
              <Table.DropdownFilter
                options={uniqueValues.amount}
                selectedOptions={columnFilters.get('amount') ?? []}
                onSelect={(selected: string[]) => setFilter('amount', selected)}
                onSort={(direction) => handleSort('amount', direction)}
              >
                Сумма, ₽
              </Table.DropdownFilter>
            </Table.HeaderCell>
            <Table.HeaderCell width={'300px'}>
              <Table.DropdownFilter
                options={uniqueValues.responsibleName}
                selectedOptions={columnFilters.get('responsibleName') ?? []}
                onSelect={(selected: string[]) => setFilter('responsibleName', selected)}
                onSort={(direction) => handleSort('responsible', direction)}
              >
                Ответственный
              </Table.DropdownFilter>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5}>Нет данных, соответствующих вашему запросу.</Table.Cell>
            </Table.Row>
          ) : (
            <>
              {paginatedRows.map((row) => (
                <>
                  <Table.Row checked={checkedRows.has(row.id)} key={row.id} onClick={() => handleRowClick(row.id)}>
                    <Table.CheckboxCell
                      checked={isRowChecked(row.id)}
                      onCheckboxClick={(e) => toggleRow(e, row.id)}
                    ></Table.CheckboxCell>
                    <Table.Cell>{row.client}</Table.Cell>
                    <Table.Cell>
                      11{row.region}
                      <br />
                      {row.region}12312
                    </Table.Cell>
                    <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
                    <Table.Cell>
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      {row.responsible.name}
                      <Table.ActionBar
                        popup
                        items={[
                          {
                            icon: <IconSendPaperplaneRegular20 />,
                            text: 'Отправить',
                          },
                          {
                            icon: <IconTechPrinterRegular20 />,
                            text: 'Напечатать',
                          },
                          {
                            icon: <IconDocsPlusRegular20 />,
                            text: 'Скопировать',
                          },
                          {
                            icon: <IconMoneyTypeCoinsRegular20 />,
                            text: 'Уплатить',
                          },
                          {
                            icon: <IconNetDownloadRegular20 />,
                            text: 'Скачать',
                          },
                          {
                            icon: <IconTrashCanRegular20 />,
                            text: 'Удалить',
                          },
                        ]}
                      />
                    </Table.Cell>
                  </Table.Row>
                </>
              ))}
            </>
          )}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell checkboxCell />
            <Table.Cell colSpan={5}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  Показано {startIndex + 1}-{Math.min(endIndex, sortedRows.length)} из {sortedRows.length} записей
                </span>
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
