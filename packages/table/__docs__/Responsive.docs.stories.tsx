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
import { Paging } from '@skbkontur/react-ui/components/Paging';
import { Select } from '@skbkontur/react-ui/components/Select';
import { Table, useTableFilters, useTableRowSelection, useTableSort } from '@skbkontur/table';
import React from 'react';

import { initialData } from '../__stories__/data';

export default {
  title: 'Responsive',
};

export const ResponsiveExampleStory = () => {
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
  } = useTableFilters<TableRow, string>(memoizedInitialData, columnConfig);

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
    [tableSize],
  );

  const renderActionButtons = () => (
    <Table.ActionBar
      overlay
      items={[
        {
          icon: getIcon(IconSendPaperplaneRegular16, IconSendPaperplaneRegular20, IconSendPaperplaneRegular24),
          text: 'Отправить',
          onClick: () => console.log('send'),
        },
        {
          icon: getIcon(IconTechPrinterRegular16, IconTechPrinterRegular20, IconTechPrinterRegular24),
          text: 'Напечатать',
          onClick: () => console.log('print'),
          danger: true,
        },
        {
          icon: getIcon(IconDocsPlusRegular16, IconDocsPlusRegular20, IconDocsPlusRegular24),
          text: 'Скопировать',
          onClick: () => console.log('copy'),
        },
        {
          icon: getIcon(IconMoneyTypeCoinsRegular16, IconMoneyTypeCoinsRegular20, IconMoneyTypeCoinsRegular24),
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
  );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        margin: '10px auto',
        border: '1px solid #EAEDF2',
        borderRadius: 8,
        overflowX: 'auto',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <Select<'small' | 'medium' | 'large'>
            width={140}
            items={['small', 'medium', 'large']}
            value={tableSize}
            onValueChange={(value) => setTableSize(value)}
          />
        </div>

        <Table hasChecked={hasChecked} size={tableSize} minWidth={'920px'}>
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
              <Table.HeaderCell currency width={'160px'}>
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
                    <br />
                    Старший специалист по сопровождению клиентов
                    {renderActionButtons()}
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
          <Table.Footer sticky>
            <Table.Row>
              <Table.Cell checkboxCell />
              <Table.Cell colSpan={4}>
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
    </div>
  );
};
