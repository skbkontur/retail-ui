import React, { useContext, useCallback, forwardRef, type CSSProperties, type MouseEventHandler } from 'react';
import cx from 'classnames';
import textStyles from '@skbkontur/typography/Text.module.css';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';

import { getSizeModifier } from '../../utils/getSizeModifier.js';
import { getCheckboxSize } from '../../utils/getCheckboxSize.js';
import { getTypographyClass } from '../../utils/getTypographyClass.js';

import styles from './Table.module.css';
import { TableDataTids } from './TableDataTids.js';
import { SizeTableContext } from './TableContext.js';

export interface TableCellBaseProps extends CommonProps {
  colSpan?: number;
  width?: CSSProperties['width'];
  rowSpan?: number;
  checkboxCell?: boolean;
  noWrap?: boolean;
  currency?: boolean;
  vAlign?: CSSProperties['verticalAlign'];
  onClick?: MouseEventHandler<HTMLTableCellElement>;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellBaseProps>(
  (
    {
      children,
      colSpan,
      rowSpan,
      checkboxCell,
      noWrap,
      currency,
      width,
      vAlign,
      className,
      onClick: onClickProp,
      ...rest
    },
    ref
  ) => {
    const isString = typeof children === 'string';
    const { size } = useContext(SizeTableContext);
    const onClick = useCallback(
      (e: React.MouseEvent<HTMLTableCellElement>) => {
        if (checkboxCell) {
          e.stopPropagation();
        }
        onClickProp?.(e);
      },
      [checkboxCell, onClickProp]
    );

    const typographyClass = getTypographyClass(size);
    const tableCellSizeClass = styles[getSizeModifier('TableCell', size)];
    const tableCellTextSizeClass = styles[getSizeModifier('TableCellText', size)];

    return (
      <td
        ref={ref}
        colSpan={colSpan}
        rowSpan={rowSpan}
        className={cx(styles.TableCell, typographyClass, textStyles.noSpacing, className, {
          [styles.CheckboxCell]: checkboxCell,
          [tableCellSizeClass]: !checkboxCell,
          [tableCellTextSizeClass]: isString,
          [styles.NoWrapCell]: noWrap,
          [styles.Currency]: currency,
        })}
        style={{ width: width ?? (checkboxCell ? getCheckboxSize(size) : undefined), ...rest.style }}
        data-tid={checkboxCell ? TableDataTids.checkboxCell : TableDataTids.cell}
        {...rest}
        onClick={onClick}
      >
        <div>{children}</div>
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';
