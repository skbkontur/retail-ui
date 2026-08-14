import { IconUiFilterSortADefaultRegular16 } from '@skbkontur/icons/IconUiFilterSortADefaultRegular16';
import { IconUiFilterSortADefaultRegular20 } from '@skbkontur/icons/IconUiFilterSortADefaultRegular20';
import { IconUiFilterSortADefaultRegular24 } from '@skbkontur/icons/IconUiFilterSortADefaultRegular24';
import type { Button } from '@skbkontur/react-ui/components/Button/Button';
import React, { forwardRef, useCallback, useContext, type ComponentRef, type MouseEvent } from 'react';

import type { SortDirection } from '../../hooks/useTableSort.js';
import type { SizeProp } from '../../reactUiCompat/useSizeContext.js';
import { getIconSize } from '../../utils/getIconSize.js';
import { SizeTableContext } from './TableContext.js';
import { TableDataTids } from './TableDataTids.js';
import type { TableHeaderButtonProps } from './TableFilter/TableHeaderButton.js';
import { TableHeaderButton } from './TableFilter/TableHeaderButton.js';

const DEFAULT_SORT_ICONS = {
  16: IconUiFilterSortADefaultRegular16,
  20: IconUiFilterSortADefaultRegular20,
  24: IconUiFilterSortADefaultRegular24,
} as const;

const getDefaultSortIcon = (size: SizeProp = 'small') => {
  const iconSize = getIconSize(size);
  const IconComponent = DEFAULT_SORT_ICONS[iconSize === 24 ? 20 : iconSize];
  return <IconComponent />;
};

export interface TableSortProps extends Omit<TableHeaderButtonProps, 'onClick'> {
  onSort?: (direction: SortDirection) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export const TableSort = forwardRef<ComponentRef<typeof Button>, TableSortProps>(
  ({ children, sortDirection, onSort, onClick, defaultIcon, ...rest }, ref) => {
    const { size } = useContext(SizeTableContext);
    const handleClick = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        if (onSort) {
          const nextDirection: SortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
          onSort(nextDirection);
        }
        onClick?.(event);
      },
      [sortDirection, onSort, onClick],
    );

    return (
      <TableHeaderButton
        ref={ref}
        defaultIcon={defaultIcon ?? getDefaultSortIcon(size)}
        data-tid={TableDataTids.sort}
        sortDirection={sortDirection}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </TableHeaderButton>
    );
  },
);
TableSort.displayName = 'TableSort';
