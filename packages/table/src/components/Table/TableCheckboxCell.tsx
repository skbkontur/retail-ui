import React, { useContext, forwardRef } from 'react';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';

import { SizeTableContext } from './TableContext.js';
import { TableCell, type TableCellBaseProps } from './TableCell.js';

export interface TableCheckboxCellBaseProps extends TableCellBaseProps {
  checked: boolean;
  onCheckboxClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  'aria-label': string;
}

export const TableCheckboxCell = forwardRef<HTMLTableCellElement, TableCheckboxCellBaseProps>(
  ({ checked, onCheckboxClick, onClick, ...rest }, ref) => {
    const { size } = useContext(SizeTableContext);

    return (
      <TableCell ref={ref} checkboxCell onClick={onClick}>
        <Checkbox checked={checked} onClick={onCheckboxClick} size={size} {...rest} />
      </TableCell>
    );
  }
);

TableCheckboxCell.displayName = 'TableCheckboxCell';
