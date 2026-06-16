import type { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import type { Input } from '@skbkontur/react-ui/components/Input';
import { Loader } from '@skbkontur/react-ui/components/Loader';
import { ScrollContainer } from '@skbkontur/react-ui/components/ScrollContainer';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { useLocaleForControl } from '@skbkontur/react-ui/lib/locale/useLocaleForControl';
import React, { useState, useMemo, useCallback, useContext, useEffect, forwardRef, useRef } from 'react';
import type { ReactElement, ComponentRef } from 'react';

import { TableLocaleHelper } from '../../locale/index.js';
import { SizeTableContext } from './TableContext.js';
import { TableDataTids } from './TableDataTids.js';
import { TableFilter } from './TableFilter/TableFilter.js';
import { TableFilterItem } from './TableFilter/TableFilterItem.js';
import { TableFilterSearch } from './TableFilter/TableFilterSearch.js';

export interface TableDropdownFilterProps extends CommonProps {
  options: string[];
  selectedOptions: string[];
  searchPlaceholder?: string;
  onSelect: (options: string[]) => void;
  loaderActive?: boolean;
  withoutSearch?: boolean;
  withoutDefaultIcon?: boolean;
  defaultIcon?: ReactElement;
  iconDefaultColor?: React.CSSProperties['color'];
  iconActiveColor?: React.CSSProperties['color'];
}

export const TableDropdownFilter = forwardRef<ComponentRef<typeof Button>, TableDropdownFilterProps>(
  (
    {
      children,
      options,
      selectedOptions,
      onSelect,
      searchPlaceholder,
      loaderActive,
      withoutSearch = false,
      withoutDefaultIcon,
      defaultIcon,
      iconDefaultColor,
      iconActiveColor,
      ...rest
    },
    ref
  ) => {
    const { size } = useContext(SizeTableContext);
    const locale = useLocaleForControl('Table', TableLocaleHelper);
    const searchPlaceholderValue = searchPlaceholder ?? locale.searchPlaceholder;
    const [searchTerm, setSearchTerm] = useState('');
    const [currentSelected, setCurrentSelected] = useState<string[]>([]);
    const searchInputRef = useRef<Input>(null);

    const handleOpen = useCallback(() => {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }, []);

    useEffect(() => {
      setCurrentSelected(Array.isArray(selectedOptions) ? selectedOptions : []);
    }, [selectedOptions]);

    useEffect(() => {
      if (withoutSearch && searchTerm) {
        setSearchTerm('');
      }
    }, [withoutSearch, searchTerm]);

    const filteredOptions = useMemo(() => {
      if (withoutSearch) {
        return options;
      }

      return options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [options, searchTerm, withoutSearch]);

    const toggle = useCallback(
      (item: string) => {
        setCurrentSelected((prevSelected) => {
          const newSelected = new Set(prevSelected);

          if (newSelected.has(item)) {
            newSelected.delete(item);
          } else {
            newSelected.add(item);
          }
          const result = Array.from(newSelected);
          onSelect(result);
          return result;
        });
      },
      [onSelect]
    );

    return (
      <TableFilter
        ref={ref}
        filtered={currentSelected.length > 0}
        data-tid={TableDataTids.dropdownFilter}
        onOpen={withoutSearch ? undefined : handleOpen}
        withoutDefaultIcon={withoutDefaultIcon}
        defaultIcon={defaultIcon}
        iconDefaultColor={iconDefaultColor}
        iconActiveColor={iconActiveColor}
        {...rest}
        popup={
          <>
            {!withoutSearch && (
              <TableFilterSearch
                ref={searchInputRef}
                searchPlaceholder={searchPlaceholderValue}
                searchQuery={searchTerm}
                handleSearchQuery={setSearchTerm}
              />
            )}
            <Loader active={loaderActive} type="normal">
              <ScrollContainer maxHeight="50vh">
                {filteredOptions.length === 0 ? (
                  <TableFilterItem disabled>{locale.noResultsLabel}</TableFilterItem>
                ) : (
                  filteredOptions.map((item) => (
                    <TableFilterItem key={item} size={size} onClick={() => toggle(item)}>
                      <Checkbox checked={currentSelected.includes(item)} size={size}>
                        {item}
                      </Checkbox>
                    </TableFilterItem>
                  ))
                )}
              </ScrollContainer>
            </Loader>
          </>
        }
      >
        {children}
      </TableFilter>
    );
  }
);
TableDropdownFilter.displayName = 'TableDropdownFilter';
