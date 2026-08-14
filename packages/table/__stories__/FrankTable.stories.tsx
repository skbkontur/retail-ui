import { IconDocsPlusRegular20 } from '@skbkontur/icons/IconDocsPlusRegular20';
import { IconMoneyTypeCoinsRegular20 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular20';
import { IconNetDownloadRegular20 } from '@skbkontur/icons/IconNetDownloadRegular20';
import { IconSendPaperplaneRegular20 } from '@skbkontur/icons/IconSendPaperplaneRegular20';
import { IconTechPrinterRegular20 } from '@skbkontur/icons/IconTechPrinterRegular20';
import { IconTrashCanRegular20 } from '@skbkontur/icons/IconTrashCanRegular20';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { Textarea } from '@skbkontur/react-ui/components/Textarea';
import { Table, TableFilterResultRow, useTableRowSelection, useTableSort, useTableFilters } from '@skbkontur/table';
import React from 'react';

import { initialData } from '../__stories__/data';

export default {
  title: 'Table/FrankTable',
};

export const FrankTableExampleStory = () => {
  const memoizedInitialData = React.useMemo(() => initialData, []);
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
    resetFilters,
    convertFiltersToTokens,
  } = useTableFilters<TableRow, string>(memoizedInitialData, columnConfig);
  const { sortedRows, sortConfig, handleSort } = useTableSort(filteredData, { direction: 'asc' });

  const { checkedRows, isCheckedAll, hasChecked, checkboxRef, selectAll, toggleRow, isRowChecked } =
    useTableRowSelection(sortedRows as TableRow[]);

  const handleRowClick = React.useCallback((rowId: number) => {
    console.log(`Клик по строке: ${rowId}`);
  }, []);
  const filterTokens = convertFiltersToTokens();

  return (
    <div style={{ width: '800px', margin: '10px' }}>
      <Table hasChecked={hasChecked}>
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
            <Table.HeaderCell width={'200px'}>
              <Table.DropdownSortableFilter
                options={uniqueValues.client}
                selectedOptions={columnFilters.get('client') ?? []}
                onSelect={(selected: string[]) => setFilter('client', selected)}
                onSort={(direction) => handleSort('client', direction)}
                sort={sortConfig.direction}
              >
                Клиент
                {Array.isArray(columnFilters.get('client')) &&
                  columnFilters.get('client')?.length > 0 &&
                  ` (${columnFilters.get('client')?.length})`}
              </Table.DropdownSortableFilter>
            </Table.HeaderCell>

            <Table.HeaderCell width={'200px'}>
              <Table.DropdownFilter
                options={uniqueValues.region}
                selectedOptions={columnFilters.get('region') ?? []}
                onSelect={(selected: string[]) => setFilter('region', selected)}
                onSort={(direction) => handleSort('region', direction)}
              >
                Регион
              </Table.DropdownFilter>
            </Table.HeaderCell>
            <Table.HeaderCell currency width={'160px'}>
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
          {filterTokens.length > 0 && <TableFilterResultRow tokens={filterTokens} onResetAll={resetFilters} />}
          {sortedRows.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5}>Нет данных, соответствующих вашему запросу.</Table.Cell>
            </Table.Row>
          ) : (
            sortedRows.map((row) => (
              <>
                <Table.Row key={row.id} onClick={() => handleRowClick(row.id)} checked={checkedRows.has(row.id)}>
                  <Table.Cell checkboxCell>
                    <Checkbox checked={isRowChecked(row.id)} onClick={(e) => toggleRow(e, row.id)} />
                  </Table.Cell>
                  <Table.Cell style={{ padding: '0' }} colSpan={5}>
                    <Table>
                      <Table.Row key={row.id + 'in'}>
                        <Table.Cell width={'176px'}>{row.client}</Table.Cell>
                        <Table.Cell width={'176px'}>
                          11{row.region}
                          <br />
                          {row.region}12312
                        </Table.Cell>
                        <Table.Cell currency width={'136px'}>
                          {row.amount.toLocaleString('ru-RU')}
                        </Table.Cell>
                        <Table.Cell width={'276px'}>
                          {row.responsible.name}
                          {row.responsible.name}
                          {row.responsible.name}
                          {row.responsible.name}
                          {row.responsible.name}
                          {row.responsible.name}
                          {row.responsible.name}
                          {row.responsible.name}
                          <Table.ActionBar
                            overlay
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
                      <Table.Row>
                        <Table.Cell colSpan={4}>
                          <Textarea width={840} />
                        </Table.Cell>
                      </Table.Row>
                    </Table>
                  </Table.Cell>
                </Table.Row>
              </>
            ))
          )}
        </Table.Body>
        <Table.Footer sticky>
          <Table.Row>
            <Table.Cell checkboxCell />
            <Table.Cell colSpan={5}>
              Показано {sortedRows.length} из {memoizedInitialData.length} записей
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};
