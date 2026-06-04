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
  (
    {
      checked,
      onCheckboxClick,
      onClick,
      colSpan,
      rowSpan,
      width,
      vAlign,
      noBottomBorder,
      noBottomBorderInset,
      noWrap,
      currency,
      contentCompensator,
      className,
      style,
      'data-tid': dataTid,
      ...rest
    },
    ref
  ) => {
    const { size } = useContext(SizeTableContext);

    return (
      <TableCell
        ref={ref}
        checkboxCell
        onClick={onClick}
        colSpan={colSpan}
        rowSpan={rowSpan}
        width={width}
        vAlign={vAlign}
        noBottomBorder={noBottomBorder}
        noBottomBorderInset={noBottomBorderInset}
        noWrap={noWrap}
        currency={currency}
        contentCompensator={contentCompensator}
        className={className}
        style={style}
        data-tid={dataTid}
      >
        <Checkbox checked={checked} onClick={onCheckboxClick} size={size} {...rest} />
      </TableCell>
    );
  }
);

TableCheckboxCell.displayName = 'TableCheckboxCell';
