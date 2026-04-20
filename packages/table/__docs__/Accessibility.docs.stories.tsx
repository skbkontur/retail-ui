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
import { Button } from '@skbkontur/react-ui/components/Button';
import { Link } from '@skbkontur/react-ui/components/Link';
import { Paging } from '@skbkontur/react-ui/components/Paging';
import { Select } from '@skbkontur/react-ui/components/Select';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import { DARK_THEME } from '@skbkontur/react-ui/lib/theming/themes/DarkTheme';
import { LIGHT_THEME } from '@skbkontur/react-ui/lib/theming/themes/LightTheme';
import React from 'react';

import { initialData } from '../__stories__/data';
import {
  Table,
  useTableRowSelection,
  useTableSort,
  useTableFilters,
  ColumnFilterConfig,
  TableActionBar,
} from '../index';

export default {
  title: 'Accessibility',
};

export const AccessibilityExampleStory = () => {
  const helloKittyTableTheme = {
    tableBaseSize: '8px',
    tableStickyBackground: '#FFE4E6',
    tableText: '#8B4A6B',
    tableSecondaryText: '#C97A9E',
    tableOutline: '#FFB6C1',
    tableOutlineWidth: '2px',
    tableBorder: '#FFB6C1',
    tableRowHover: '#FFE4E6',
    tableShadowLight: '#FFE4E6',
    tableRowCheckedHoverLight: '#FFB6C1',
    tableRowCheckedHoverDark: '#FFB6C1',
    tableShadowMediumLight: '#FFB6C1',
    tableShadowMediumDark: '#FFB6C1',
  };
  const helloKittyTheme = ThemeFactory.create(helloKittyTableTheme as any, LIGHT_THEME);
  const themeSelector = () => {
    switch (selectedTheme) {
      case 'LIGHT_THEME':
        return LIGHT_THEME;
      case 'DARK_THEME':
        return DARK_THEME;
      case 'HELLO_KITTY':
        return helloKittyTheme;
      default:
        return LIGHT_THEME;
    }
  };
  const memoizedInitialData = React.useMemo(() => initialData, []);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [tableSize, setTableSize] = React.useState<'medium' | 'small' | 'large'>('medium');
  const [selectedTheme, setSelectedTheme] = React.useState('LIGHT_THEME');
  const itemsPerPage = 10;
  type TableRow = (typeof initialData)[number];
  type ColumnKey = 'client' | 'region' | 'amount' | 'responsibleName';

  const columnConfig: Array<ColumnFilterConfig<TableRow, ColumnKey>> = [
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
  } = useTableFilters<TableRow, ColumnKey>(memoizedInitialData, columnConfig);
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
    alert(`Вы кликнули на строку с ID: ${rowId}`);
  }, []);

  const handleButtonClick = React.useCallback((rowId: number) => {
    console.log(`Кнопка нажата для строки: ${rowId}`);
    alert(`Кнопка нажата для строки с ID: ${rowId}`);
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
    <ThemeContext.Consumer>
      {(baseTheme) => {
        const currentTheme = ThemeFactory.create(baseTheme, themeSelector());

        return (
          <ThemeContext.Provider value={currentTheme}>
            <div
              style={{
                width: '900px',
                margin: '10px',
                backgroundColor: currentTheme.bgDefault,
                color: currentTheme.textColorDefault,
              }}
            >
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <Select<'medium' | 'small' | 'large'>
                  items={['small', 'medium', 'large']}
                  value={tableSize}
                  onValueChange={(value) => setTableSize(value)}
                />
              </div>
              {filterTokens.length > 0 && <Table.FilterResultRow tokens={filterTokens} onResetAll={resetFilters} />}
              <Table hasChecked={hasChecked} size={tableSize as 'medium' | 'small' | 'large'}>
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
                        options={uniqueValues.client ?? []}
                        selectedOptions={columnFilters.get('client') ?? []}
                        onSelect={(selected: string[]) => setFilter('client', selected)}
                        onSort={(direction) => handleSort('client', direction)}
                        sortDirection={sortConfig.key === 'client' ? (sortConfig.direction ?? undefined) : undefined}
                      >
                        Клиент
                      </Table.DropdownSortableFilter>
                    </Table.HeaderCell>
                    <Table.HeaderCell width={'200px'}>
                      <Table.Sort
                        onSort={(direction) => handleSort('region', direction)}
                        sortDirection={sortConfig.key === 'region' ? (sortConfig.direction ?? undefined) : undefined}
                        filtered={(columnFilters.get('region')?.length ?? 0) > 0}
                      >
                        Кнопка
                      </Table.Sort>
                    </Table.HeaderCell>
                    <Table.HeaderCell width={'300px'}>Ответственный</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {sortedRows.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={4}>Нет данных, соответствующих вашему запросу.</Table.Cell>
                    </Table.Row>
                  ) : (
                    <>
                      {paginatedRows.map((row, index) => (
                        <Table.Row
                          bottomBorder={true}
                          checked={checkedRows.has(row.id)}
                          key={row.id}
                          onClick={() => handleRowClick(row.id)}
                        >
                          <Table.CheckboxCell
                            checked={isRowChecked(row.id)}
                            onCheckboxClick={(e) => toggleRow(e, row.id)}
                            aria-label={`Выбрать строку ${row.client}`}
                          />
                          <Table.Cell>
                            фывфыв
                            <Link href={`/clients/${row.id}`} onClick={(e) => e.stopPropagation()}>
                              {row.client}
                            </Link>
                          </Table.Cell>
                          <Table.Cell contentCompensator={false}>
                            <Button
                              size={tableSize === 'small' ? 'small' : tableSize === 'large' ? 'large' : 'medium'}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleButtonClick(row.id);
                              }}
                            >
                              Действие
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            {row.responsible.name}
                            {index % 2 === 1 && <br />}
                            <Link href={`/responsible/${row.id}`} onClick={(e) => e.stopPropagation()}>
                              Подробнее
                            </Link>
                            <TableActionBar caption={<Table.ActionKebab />}></TableActionBar>
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
                                  onClick: () => {
                                    console.log(`Клик по Отправить`);
                                    alert(`Вы кликнули на Отправить`);
                                  },
                                },
                                {
                                  icon: getIcon(
                                    IconTechPrinterRegular16,
                                    IconTechPrinterRegular20,
                                    IconTechPrinterRegular24
                                  ),
                                  text: 'Напечатать',
                                  onClick: () => {
                                    console.log(`Клик по Напечатать`);
                                    alert(`Вы кликнули на Напечатать`);
                                  },
                                  danger: true,
                                },
                                {
                                  icon: getIcon(IconDocsPlusRegular16, IconDocsPlusRegular20, IconDocsPlusRegular24),
                                  text: 'Скопировать',
                                  onClick: () => {
                                    console.log(`Клик по Скопировать`);
                                    alert(`Вы кликнули на Скопировать`);
                                  },
                                },
                                {
                                  icon: getIcon(
                                    IconMoneyTypeCoinsRegular16,
                                    IconMoneyTypeCoinsRegular20,
                                    IconMoneyTypeCoinsRegular24
                                  ),
                                  text: 'Уплатить',
                                  onClick: () => {
                                    console.log(`Клик по Уплатить`);
                                    alert(`Вы кликнули на Уплатить`);
                                  },
                                },
                                {
                                  icon: getIcon(
                                    IconNetDownloadRegular16,
                                    IconNetDownloadRegular20,
                                    IconNetDownloadRegular24
                                  ),
                                  text: 'Скачать',
                                  onClick: () => {
                                    console.log(`Клик по Скачать`);
                                    alert(`Вы кликнули на Скачать`);
                                  },
                                },
                                {
                                  icon: getIcon(IconTrashCanRegular16, IconTrashCanRegular20, IconTrashCanRegular24),
                                  text: 'Удалить',
                                  onClick: () => {
                                    console.log(`Клик по Удалить`);
                                    alert(`Вы кликнули на Удалить`);
                                  },
                                },
                              ]}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </>
                  )}
                </Table.Body>
                <Table.Footer sticky>
                  <Table.Row>
                    <Table.Cell colSpan={4}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p>
                          Показано {startIndex + 1}-{Math.min(endIndex, sortedRows.length)} из {sortedRows.length}{' '}
                          записей
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
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
