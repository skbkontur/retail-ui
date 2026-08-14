import { IconUiFilterSortAHighToLowRegular16 } from '@skbkontur/icons/IconUiFilterSortAHighToLowRegular16';
import { IconUiFilterSortAHighToLowRegular20 } from '@skbkontur/icons/IconUiFilterSortAHighToLowRegular20';
import { IconUiFilterSortAHighToLowRegular24 } from '@skbkontur/icons/IconUiFilterSortAHighToLowRegular24';
import { IconUiFilterSortALowToHighRegular16 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular16';
import { IconUiFilterSortALowToHighRegular20 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular20';
import { IconUiFilterSortALowToHighRegular24 } from '@skbkontur/icons/IconUiFilterSortALowToHighRegular24';
import type { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import { Loader } from '@skbkontur/react-ui/components/Loader';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator/MenuSeparator';
import { ScrollContainer } from '@skbkontur/react-ui/components/ScrollContainer';
import { useLocaleForControl } from '@skbkontur/react-ui/lib/locale/useLocaleForControl';
import React, { useContext, forwardRef, type ComponentRef } from 'react';

import { useTableDropdownFilter } from '../../hooks/useTableDropdownFilter.js';
import type { SortDirection } from '../../hooks/useTableSort.js';
import { TableLocaleHelper } from '../../locale/index.js';
import { getIconSize } from '../../utils/getIconSize.js';
import { SizeTableContext } from './TableContext.js';
import { TableDataTids } from './TableDataTids.js';
import type { TableDropdownFilterProps } from './TableDropdownFilter.js';
import { TableFilter } from './TableFilter/TableFilter.js';
import { TableFilterItem } from './TableFilter/TableFilterItem.js';
import { TableFilterSearch } from './TableFilter/TableFilterSearch.js';

export interface TableDropdownSortableFilterProps extends TableDropdownFilterProps {
  onSort?: (direction: SortDirection) => void;
  sortDirection?: SortDirection;
  sortAscLabel?: string;
  sortDescLabel?: string;
}

const SORT_DESC_ICONS = {
  16: IconUiFilterSortAHighToLowRegular16,
  20: IconUiFilterSortAHighToLowRegular20,
  24: IconUiFilterSortAHighToLowRegular24,
} as const;

const SORT_ASC_ICONS = {
  16: IconUiFilterSortALowToHighRegular16,
  20: IconUiFilterSortALowToHighRegular20,
  24: IconUiFilterSortALowToHighRegular24,
} as const;

export const TableDropdownSortableFilter = forwardRef<ComponentRef<typeof Button>, TableDropdownSortableFilterProps>(
  (
    {
      children,
      options,
      selectedOptions,
      onSelect,
      searchPlaceholder,
      loaderActive,
      withoutSearch = false,
      onSort,
      sortDirection,
      sortAscLabel,
      sortDescLabel,
      withoutDefaultIcon,
      defaultIcon,
      iconDefaultColor,
      iconActiveColor,
      ...rest
    },
    ref,
  ) => {
    const { size } = useContext(SizeTableContext);
    const locale = useLocaleForControl('Table', TableLocaleHelper);
    const searchPlaceholderValue = searchPlaceholder ?? locale.searchPlaceholder;
    const ascLabel = sortAscLabel ?? locale.sortAscLabel;
    const descLabel = sortDescLabel ?? locale.sortDescLabel;

    const {
      selectedOptions: currentSelected,
      searchTerm,
      setSearchTerm,
      searchInputRef,
      handleOpen,
      filteredOptions,
      toggle,
    } = useTableDropdownFilter({ options, selectedOptions, onSelect, withoutSearch });

    const iconSize = getIconSize(size);
    const AscIcon = SORT_ASC_ICONS[iconSize];
    const DescIcon = SORT_DESC_ICONS[iconSize];

    return (
      <TableFilter
        ref={ref}
        filtered={currentSelected.length > 0}
        sortDirection={sortDirection}
        data-tid={TableDataTids.dropdownSortableFilter}
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
              <MenuSeparator />
              <TableFilterItem onClick={() => onSort?.('asc')} size={size}>
                {ascLabel} <AscIcon />
              </TableFilterItem>
              <TableFilterItem onClick={() => onSort?.('desc')} size={size}>
                {descLabel} <DescIcon />
              </TableFilterItem>
            </Loader>
          </>
        }
      >
        {children}
      </TableFilter>
    );
  },
);
TableDropdownSortableFilter.displayName = 'TableDropdownSortableFilter';
