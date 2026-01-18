import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { ScrollContainer } from '@skbkontur/react-ui/components/ScrollContainer';
import React, { useState, useMemo, useCallback } from 'react';
import { TableFilter } from '../src/components/Table/TableFilter/TableFilter';
import { TableFilterItem } from '../src/components/Table/TableFilter/TableFilterItem';
import { TableFilterSearch } from '../src/components/Table/TableFilter/TableFilterSearch';
import { initialData } from './data';
import { TableDropdownFilterProps } from '../src/components/Table/TableDropdownFilter';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';
import { ColumnFilterValues } from '../__stories__/data';
import { useTableFilters } from '../src/hooks/useTableFilters';
import { Table } from '../src/components/Table/Table';
import { Input } from '@skbkontur/react-ui/components/Input';

const options = initialData.map((x) => x.client);

export const FilterStory = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFilterValues>({
    client: [],
    region: [],
    amount: [],
    responsibleName: [],
  });

  const handleColumnFilterChange = useCallback(
    <K extends keyof ColumnFilterValues>(column: K, selectedOptions: string[]) => {
      setColumnFilters((prevFilters) => ({
        ...prevFilters,
        [column]: selectedOptions,
      }));
    },
    []
  );

  const handleSort = useCallback((columnKey: string, direction: 'asc' | 'desc') => {
    console.log({ key: columnKey, direction });
  }, []);
  return (
    <div>
      <CustomDropdownFilter
        options={options}
        selectedOptions={columnFilters.client}
        onSelect={(selected: string[]) => handleColumnFilterChange('client', selected)}
        onSort={(direction) => handleSort('client', direction)}
      >
        Клиент
        {columnFilters.client.length > 0 && ` (${columnFilters.client.length})`}
      </CustomDropdownFilter>
    </div>
  );
};

interface CustomDropdownFilterProps extends TableDropdownFilterProps {
  sortDirection?: 'asc' | 'desc';
}

const CustomDropdownFilter = React.forwardRef<HTMLDivElement, CustomDropdownFilterProps>(
  (
    { children, options, selectedOptions, onSelect, searchPlaceholder = 'Поиск...', onSort, sortDirection, ...rest },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = useMemo(() => {
      return options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [options, searchTerm]);

    const toggleSelection = useCallback(
      (item: string, isChecked: boolean) => {
        const currentSelection = Array.isArray(selectedOptions) ? selectedOptions : [];

        let newSelection;
        if (isChecked) {
          newSelection = [...currentSelection, item];
        } else {
          newSelection = currentSelection.filter((i) => i !== item);
        }
        onSelect(newSelection);
      },
      [onSelect, selectedOptions]
    );

    const hasSelected = Array.isArray(selectedOptions) && selectedOptions.length > 0;

    return (
      <div ref={ref}>
        <TableFilter
          filtered={hasSelected}
          sortDirection={sortDirection}
          popup={
            <>
              <TableFilterSearch
                searchPlaceholder={searchPlaceholder}
                searchQuery={searchTerm}
                handleSearchQuery={setSearchTerm}
              />
              <ScrollContainer maxHeight="50vh">
                {filteredOptions.length === 0 ? (
                  <TableFilterItem disabled>Нет результатов</TableFilterItem>
                ) : (
                  filteredOptions.map((item) => (
                    <TableFilterItem key={item}>
                      <Checkbox
                        checked={selectedOptions.includes(item)}
                        onValueChange={(isChecked) => toggleSelection(item, isChecked)}
                      >
                        {item}
                      </Checkbox>
                    </TableFilterItem>
                  ))
                )}
              </ScrollContainer>
              {onSort && (
                <>
                  <TableFilterItem onClick={() => onSort('asc')}>По возрастанию</TableFilterItem>
                  <TableFilterItem onClick={() => onSort('desc')}>По убыванию</TableFilterItem>
                </>
              )}
            </>
          }
        >
          {children}
        </TableFilter>
      </div>
    );
  }
);
export const FilterWayBill = () => {
  const [wayBillFilter, setWayBillFilter] = useState({
    date1: '',
    date2: '',
    type: 'Боевой',
  });
  return (
    <div>
      <TableFilter
        filtered={!!wayBillFilter.date1 || !!wayBillFilter.date2}
        popup={
          <>
            <TableFilterItem size="small" disabled>
              Дата путевого листа
            </TableFilterItem>
            <TableFilterItem disabled>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div>
                  <DatePicker
                    value={wayBillFilter.date1}
                    width="120px"
                    menuAlign="right"
                    onValueChange={(value) =>
                      setWayBillFilter((f) => {
                        return { ...f, date1: value };
                      })
                    }
                  />
                </div>
                <div>&mdash;</div>
                <div>
                  <DatePicker
                    value={wayBillFilter.date2}
                    width="120px"
                    menuAlign="right"
                    onValueChange={(value) =>
                      setWayBillFilter((f) => {
                        return { ...f, date2: value };
                      })
                    }
                  />
                </div>
              </div>
            </TableFilterItem>
            <TableFilterItem size="small" disabled>
              Тип
            </TableFilterItem>
            <TableFilterItem>
              <Checkbox>Боевой</Checkbox>
            </TableFilterItem>
            <TableFilterItem>
              <Checkbox>Тестовый</Checkbox>
            </TableFilterItem>
            <TableFilterItem size="small" disabled>
              Ожидает подписи
            </TableFilterItem>
            <TableFilterItem>
              <Checkbox>Медика</Checkbox>
            </TableFilterItem>
            <TableFilterItem>
              <Checkbox>Механика</Checkbox>
            </TableFilterItem>
            <TableFilterItem onClick={() => console.log('asc')}>По возрастанию</TableFilterItem>
            <TableFilterItem onClick={() => console.log('desc')}>По убыванию</TableFilterItem>
          </>
        }
      >
        Путевой лист
      </TableFilter>
    </div>
  );
};

export const FilterWithHookClient = () => {
  const columnConfig = [
    {
      key: 'client' as const,
      accessor: (row: (typeof initialData)[0]) => row.client,
      stringify: (value: string) => value,
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows } = useTableFilters(initialData, columnConfig);
  const selectedClients = filters.get('client') || [];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <CustomDropdownFilter
          options={uniqueValues.client}
          selectedOptions={selectedClients}
          onSelect={(selected: string[]) => setFilter('client', selected)}
        >
          Клиент
          {selectedClients.length > 0 && ` (${selectedClients.length})`}
        </CustomDropdownFilter>
      </div>
      <div>
        <strong>
          Отфильтровано записей: {filteredRows.length} из {initialData.length}
        </strong>
        <ul>
          {filteredRows.map((row) => (
            <li key={row.id}>
              {row.client} - {row.region} - {row.amount.toLocaleString('ru-RU')} ₽
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const FilterWithHookRegion = () => {
  const columnConfig = [
    {
      key: 'region' as const,
      accessor: (row: (typeof initialData)[0]) => row.region,
      stringify: (value: string) => value,
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows } = useTableFilters(initialData, columnConfig);
  const selectedRegions = filters.get('region') || [];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <CustomDropdownFilter
          options={uniqueValues.region}
          selectedOptions={selectedRegions}
          onSelect={(selected: string[]) => setFilter('region', selected)}
          searchPlaceholder="Поиск региона..."
        >
          Регион
          {selectedRegions.length > 0 && ` (${selectedRegions.length})`}
        </CustomDropdownFilter>
      </div>
      <div>
        <strong>Найдено: {filteredRows.length} записей</strong>
        <ul>
          {filteredRows.map((row) => (
            <li key={row.id}>
              {row.region} - {row.client} - {row.amount.toLocaleString('ru-RU')} ₽
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const FilterWithHookResponsible = () => {
  const columnConfig = [
    {
      key: 'responsibleName' as const,
      accessor: (row: (typeof initialData)[0]) => row.responsible.name,
      stringify: (value: string) => value,
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows } = useTableFilters(initialData, columnConfig);
  const selectedResponsibles = filters.get('responsibleName') || [];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <CustomDropdownFilter
          options={uniqueValues.responsibleName}
          selectedOptions={selectedResponsibles}
          onSelect={(selected: string[]) => setFilter('responsibleName', selected)}
        >
          Ответственный
          {selectedResponsibles.length > 0 && ` (${selectedResponsibles.length})`}
        </CustomDropdownFilter>
      </div>
      <div>
        <strong>Записей: {filteredRows.length}</strong>
        <ul>
          {filteredRows.map((row) => (
            <li key={row.id}>
              {row.responsible.name} - {row.client} - {row.amount.toLocaleString('ru-RU')} ₽
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const FilterWithHookAmountRange = () => {
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const columnConfig = [
    {
      key: 'amount' as const,
      accessor: (row: (typeof initialData)[0]) => row.amount,
      stringify: (value: number) => value.toLocaleString('ru-RU'),
      filterPredicate: (row: (typeof initialData)[0], selectedValues: string[]) => {
        if (selectedValues.length === 0) return true;
        const rowAmount = row.amount;
        const min = minAmount ? Number.parseInt(minAmount, 10) : 0;
        const max = maxAmount ? Number.parseInt(maxAmount, 10) : Infinity;
        return rowAmount >= min && rowAmount <= max;
      },
    },
  ];

  const { filters, setFilter, filteredRows } = useTableFilters(initialData, columnConfig);

  const handleApplyRange = useCallback(() => {
    setFilter('amount', minAmount || maxAmount ? ['range'] : []);
  }, [minAmount, maxAmount, setFilter]);

  const handleReset = useCallback(() => {
    setMinAmount('');
    setMaxAmount('');
    setFilter('amount', []);
  }, [setFilter]);

  const hasFilter = !!(minAmount || maxAmount);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <TableFilter
          filtered={hasFilter}
          popup={
            <>
              <TableFilterItem size="small" disabled>
                Диапазон сумм, ₽
              </TableFilterItem>
              <TableFilterItem disabled>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <Input placeholder="От" value={minAmount} onValueChange={setMinAmount} width="100px" />
                  <span>&mdash;</span>
                  <Input placeholder="До" value={maxAmount} onValueChange={setMaxAmount} width="100px" />
                </div>
              </TableFilterItem>
              <TableFilterItem onClick={handleApplyRange}>Применить</TableFilterItem>
              {hasFilter && <TableFilterItem onClick={handleReset}>Сбросить</TableFilterItem>}
            </>
          }
        >
          Сумма
          {hasFilter && ' (фильтр)'}
        </TableFilter>
      </div>
      <div>
        <strong>Найдено: {filteredRows.length} записей</strong>
        <ul>
          {filteredRows.map((row) => (
            <li key={row.id}>
              {row.client} - {row.amount.toLocaleString('ru-RU')} ₽
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const FilterWithHookMultiple = () => {
  const columnConfig = [
    {
      key: 'client' as const,
      accessor: (row: (typeof initialData)[0]) => row.client,
      stringify: (value: string) => value,
    },
    {
      key: 'region' as const,
      accessor: (row: (typeof initialData)[0]) => row.region,
      stringify: (value: string) => value,
    },
    {
      key: 'responsibleName' as const,
      accessor: (row: (typeof initialData)[0]) => row.responsible.name,
      stringify: (value: string) => value,
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows, resetFilters, convertFiltersToTokens } = useTableFilters(
    initialData,
    columnConfig
  );

  const selectedClients = filters.get('client') || [];
  const selectedRegions = filters.get('region') || [];
  const selectedResponsibles = filters.get('responsibleName') || [];

  const hasAnyFilter = selectedClients.length > 0 || selectedRegions.length > 0 || selectedResponsibles.length > 0;
  const filterTokens = convertFiltersToTokens();

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <CustomDropdownFilter
          options={uniqueValues.client}
          selectedOptions={selectedClients}
          onSelect={(selected: string[]) => setFilter('client', selected)}
        >
          Клиент
          {selectedClients.length > 0 && ` (${selectedClients.length})`}
        </CustomDropdownFilter>

        <CustomDropdownFilter
          options={uniqueValues.region}
          selectedOptions={selectedRegions}
          onSelect={(selected: string[]) => setFilter('region', selected)}
        >
          Регион
          {selectedRegions.length > 0 && ` (${selectedRegions.length})`}
        </CustomDropdownFilter>

        <CustomDropdownFilter
          options={uniqueValues.responsibleName}
          selectedOptions={selectedResponsibles}
          onSelect={(selected: string[]) => setFilter('responsibleName', selected)}
        >
          Ответственный
          {selectedResponsibles.length > 0 && ` (${selectedResponsibles.length})`}
        </CustomDropdownFilter>

        {hasAnyFilter && (
          <button onClick={resetFilters} style={{ padding: '5px 10px' }}>
            Сбросить все
          </button>
        )}
      </div>

      {filterTokens.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Активные фильтры:</strong>
          <div style={{ marginTop: '5px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {filterTokens.map((token) => (
              <span
                key={token.key}
                style={{
                  padding: '2px 8px',
                  background: '#e3f2fd',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
                onClick={token.onRemove}
              >
                {token.caption} ×
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <strong>
          Результат: {filteredRows.length} из {initialData.length} записей
        </strong>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Клиент</Table.HeaderCell>
              <Table.HeaderCell>Регион</Table.HeaderCell>
              <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
              <Table.HeaderCell>Ответственный</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredRows.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.client}</Table.Cell>
                <Table.Cell>{row.region}</Table.Cell>
                <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
                <Table.Cell>{row.responsible.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export const FilterWithHookAmountCategories = () => {
  const amountCategories = [
    { label: 'Малые (до 50 000)', min: 0, max: 50000 },
    { label: 'Средние (50 000 - 100 000)', min: 50000, max: 100000 },
    { label: 'Большие (свыше 100 000)', min: 100000, max: Infinity },
  ];

  const columnConfig = [
    {
      key: 'amountCategory' as const,
      accessor: (row: (typeof initialData)[0]) => row.amount,
      stringify: (value: number) => {
        const category = amountCategories.find((cat) => value >= cat.min && value <= cat.max);
        return category?.label || '';
      },
      filterPredicate: (row: (typeof initialData)[0], selectedValues: string[]) => {
        if (selectedValues.length === 0) return true;
        const rowAmount = row.amount;
        return selectedValues.some((categoryLabel) => {
          const category = amountCategories.find((cat) => cat.label === categoryLabel);
          if (!category) return false;
          return rowAmount >= category.min && rowAmount <= category.max;
        });
      },
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows } = useTableFilters(initialData, columnConfig);
  const selectedCategories = filters.get('amountCategory') || [];

  const categoryOptions = amountCategories.map((cat) => cat.label);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <CustomDropdownFilter
          options={categoryOptions}
          selectedOptions={selectedCategories}
          onSelect={(selected: string[]) => setFilter('amountCategory', selected)}
        >
          Категория суммы
          {selectedCategories.length > 0 && ` (${selectedCategories.length})`}
        </CustomDropdownFilter>
      </div>
      <div>
        <strong>Найдено: {filteredRows.length} записей</strong>
        <ul>
          {filteredRows.map((row) => (
            <li key={row.id}>
              {row.client} - {row.amount.toLocaleString('ru-RU')} ₽
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const FilterWithHookCustomPredicate = () => {
  const [searchText, setSearchText] = useState('');

  const columnConfig = [
    {
      key: 'clientSearch' as const,
      accessor: (row: (typeof initialData)[0]) => row.client,
      stringify: (value: string) => value,
      filterPredicate: (row: (typeof initialData)[0], selectedValues: string[]) => {
        if (!searchText) return true;
        const searchLower = searchText.toLowerCase();
        return (
          row.client.toLowerCase().includes(searchLower) ||
          row.region.toLowerCase().includes(searchLower) ||
          row.responsible.name.toLowerCase().includes(searchLower)
        );
      },
    },
  ];

  const { filters, setFilter, filteredRows } = useTableFilters(initialData, columnConfig);

  const handleSearch = useCallback(() => {
    setFilter('clientSearch', searchText ? [searchText] : []);
  }, [searchText, setFilter]);

  const handleReset = useCallback(() => {
    setSearchText('');
    setFilter('clientSearch', []);
  }, [setFilter]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <TableFilter
          filtered={!!searchText}
          popup={
            <>
              <TableFilterItem size="small" disabled>
                Поиск по всем полям
              </TableFilterItem>
              <TableFilterItem disabled>
                <Input
                  placeholder="Введите текст для поиска..."
                  value={searchText}
                  onValueChange={setSearchText}
                  width="250px"
                />
              </TableFilterItem>
              <TableFilterItem onClick={handleSearch}>Найти</TableFilterItem>
              {searchText && <TableFilterItem onClick={handleReset}>Сбросить</TableFilterItem>}
            </>
          }
        >
          Поиск
          {searchText && ' (активен)'}
        </TableFilter>
      </div>
      <div>
        <strong>Найдено: {filteredRows.length} записей</strong>
        <ul>
          {filteredRows.map((row) => (
            <li key={row.id}>
              <strong>{row.client}</strong> - {row.region} - {row.responsible.name} -{' '}
              {row.amount.toLocaleString('ru-RU')} ₽
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const FilterWithHookAndTable = () => {
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' | undefined }>({
    direction: undefined,
  });

  const columnConfig = [
    {
      key: 'client' as const,
      accessor: (row: (typeof initialData)[0]) => row.client,
      stringify: (value: string) => value,
    },
    {
      key: 'region' as const,
      accessor: (row: (typeof initialData)[0]) => row.region,
      stringify: (value: string) => value,
    },
  ];

  const { filters, setFilter, uniqueValues, filteredRows } = useTableFilters(initialData, columnConfig);

  const selectedClients = filters.get('client') || [];
  const selectedRegions = filters.get('region') || [];

  const handleSort = useCallback((columnKey: string, direction: 'asc' | 'desc') => {
    setSortConfig((prev) => ({
      key: prev.key === columnKey && prev.direction === direction ? null : columnKey,
      direction: prev.key === columnKey && prev.direction === direction ? undefined : direction,
    }));
  }, []);

  const sortedRows = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      const comparison = String(aValue).localeCompare(String(bValue), 'ru');
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [filteredRows, sortConfig]);

  const clientSort = sortConfig.key === 'client' ? sortConfig.direction : undefined;
  const regionSort = sortConfig.key === 'region' ? sortConfig.direction : undefined;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <CustomDropdownFilter
          options={uniqueValues.client}
          selectedOptions={selectedClients}
          onSelect={(selected: string[]) => setFilter('client', selected)}
          onSort={(direction) => handleSort('client', direction)}
          sortDirection={clientSort}
        >
          Клиент
          {selectedClients.length > 0 && ` (${selectedClients.length})`}
        </CustomDropdownFilter>

        <CustomDropdownFilter
          options={uniqueValues.region}
          selectedOptions={selectedRegions}
          onSelect={(selected: string[]) => setFilter('region', selected)}
          onSort={(direction) => handleSort('region', direction)}
          sortDirection={regionSort}
        >
          Регион
          {selectedRegions.length > 0 && ` (${selectedRegions.length})`}
        </CustomDropdownFilter>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Клиент</Table.HeaderCell>
            <Table.HeaderCell>Регион</Table.HeaderCell>
            <Table.HeaderCell currency>Сумма, ₽</Table.HeaderCell>
            <Table.HeaderCell>Ответственный</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedRows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell>{row.id}</Table.Cell>
              <Table.Cell>{row.client}</Table.Cell>
              <Table.Cell>{row.region}</Table.Cell>
              <Table.Cell currency>{row.amount.toLocaleString('ru-RU')}</Table.Cell>
              <Table.Cell>{row.responsible.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div style={{ marginTop: '10px', color: '#666' }}>
        Показано {sortedRows.length} из {initialData.length} записей
      </div>
    </div>
  );
};

export default {
  title: 'Table/Filter',
  component: CustomDropdownFilter,
};
