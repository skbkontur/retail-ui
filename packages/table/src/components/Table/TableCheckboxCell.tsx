import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import React, { useContext, forwardRef } from 'react';

import { TableCell, type TableCellBaseProps } from './TableCell.js';
import { SizeTableContext } from './TableContext.js';

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
