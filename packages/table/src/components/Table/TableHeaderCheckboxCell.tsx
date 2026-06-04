import { Checkbox } from '@skbkontur/react-ui/components/Checkbox';
import React, { useContext, forwardRef, type Ref } from 'react';

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
  (
    {
      checkboxRef,
      onClick,
      checked,
      initialIndeterminate,
      scope,
      colSpan,
      rowSpan,
      width,
      vAlign,
      align,
      bottomBorder,
      noBottomBorder,
      noBottomBorderInset,
      noWrap,
      currency,
      className,
      style,
      'data-tid': dataTid,
      ...rest
    },
    ref
  ) => {
    const { size } = useContext(SizeTableContext);
    return (
      <TableHeaderCell
        ref={ref}
        checkboxCell
        scope={scope}
        colSpan={colSpan}
        rowSpan={rowSpan}
        width={width}
        vAlign={vAlign}
        align={align}
        bottomBorder={bottomBorder}
        noBottomBorder={noBottomBorder}
        noBottomBorderInset={noBottomBorderInset}
        noWrap={noWrap}
        currency={currency}
        className={className}
        style={style}
        data-tid={dataTid}
      >
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
