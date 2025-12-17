import React, { forwardRef, useCallback, type ComponentRef, type MouseEvent } from 'react';
import type { Button } from '@skbkontur/react-ui/components/Button/Button';

import type { SortDirection } from '../../hooks/useTableSort.js';

import type { TableHeaderButtonProps } from './TableFilter/TableHeaderButton.js';
import { TableHeaderButton } from './TableFilter/TableHeaderButton.js';
import { TableDataTids } from './TableDataTids.js';

export interface TableSortProps extends Omit<TableHeaderButtonProps, 'onClick'> {
  onSort?: (direction: SortDirection) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export const TableSort = forwardRef<ComponentRef<typeof Button>, TableSortProps>(
  ({ children, sorted, onSort, onClick, ...rest }, ref) => {
    const handleClick = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        if (onSort) {
          const nextDirection: SortDirection = sorted === 'asc' ? 'desc' : 'asc';
          onSort(nextDirection);
        }
        onClick?.(event);
      },
      [sorted, onSort, onClick]
    );

    return (
      <TableHeaderButton
        ref={ref}
        withoutDefaultIcon
        data-tid={TableDataTids.sort}
        sorted={sorted}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </TableHeaderButton>
    );
  }
);
TableSort.displayName = 'TableSort';
