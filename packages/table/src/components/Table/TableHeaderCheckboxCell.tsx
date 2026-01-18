import React, { useContext, forwardRef, type Ref } from 'react';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';

import { SizeTableContext } from './TableContext.js';
import { TableHeaderCell, type TableHeaderCellBaseProps } from './TableHeaderCell.js';

export interface TableHeaderCheckboxCellBaseProps extends TableHeaderCellBaseProps {
  checkboxRef?: Ref<Checkbox>;
  onClick?: () => void;
  checked: boolean;
  initialIndeterminate?: boolean;
  'aria-label': string;
}

export const TableHeaderCheckboxCell = forwardRef<HTMLTableCellElement, TableHeaderCheckboxCellBaseProps>(
  ({ checkboxRef, onClick, checked, initialIndeterminate, colSpan, rowSpan, width, ...rest }, ref) => {
    const { size } = useContext(SizeTableContext);
    return (
      <TableHeaderCell ref={ref} checkboxCell rowSpan={rowSpan} colSpan={colSpan} width={width}>
        <Checkbox
          ref={checkboxRef}
          onClick={onClick}
          checked={checked}
          initialIndeterminate={initialIndeterminate}
          size={size}
          {...rest}
        />
      </TableHeaderCell>
    );
  }
);

TableHeaderCheckboxCell.displayName = 'TableHeaderCheckboxCell';
