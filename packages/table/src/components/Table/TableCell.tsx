import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';
import cx from 'classnames';
import React, { useContext, useCallback, forwardRef, type CSSProperties, type MouseEventHandler } from 'react';

import { getSizeModifier } from '../../utils/getSizeModifier.js';
import { getTypographyClass } from '../../utils/getTypographyClass.js';
import { SizeTableContext } from './TableContext.js';
import { TableDataTids } from './TableDataTids.js';

import styles from './Table.module.css';

export interface TableCellBaseProps extends CommonProps {
  colSpan?: number;
  width?: CSSProperties['width'];
  rowSpan?: number;
  checkboxCell?: boolean;
  /** Скрывает нижнюю границу у ячейки. Автоматически применяется для `checkboxCell`. */
  noBottomBorder?: boolean;
  /** Исключает ячейку из расчёта отступа нижней границы, чтобы она начиналась со следующей ячейки. */
  noBottomBorderInset?: boolean;
  noWrap?: boolean;
  currency?: boolean;
  vAlign?: CSSProperties['verticalAlign'];
  onClick?: MouseEventHandler<HTMLTableCellElement>;
  contentCompensator?: boolean;
  /**
   * Убирает padding и contentCompensator у ячейки и разрешает контенту
   * визуально выходить за её границы. Используется для «висящих» иконок
   * в первой колонке width:0.
   */
  noPaddingRight?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellBaseProps>(
  (
    {
      children,
      colSpan,
      rowSpan,
      checkboxCell,
      noBottomBorder,
      noBottomBorderInset,
      noWrap,
      currency,
      width,
      vAlign,
      className,
      style,
      onClick: onClickProp,
      contentCompensator = true,
      noPaddingRight = false,
      ...rest
    },
    ref
  ) => {
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
    const checkboxCellSizeClass = styles[getSizeModifier('CheckboxCell', size)];

    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<typeof rest>) => (
          <td
            {...wrapperRest}
            ref={ref}
            colSpan={colSpan}
            rowSpan={rowSpan}
            className={cx(styles.TableCell, typographyClass, className, {
              [styles.CheckboxCell]: checkboxCell,
              [checkboxCellSizeClass]: checkboxCell,
              [tableCellSizeClass]: !checkboxCell,
              [tableCellTextSizeClass]: contentCompensator && !noPaddingRight,
              [styles.WithoutBottomBorder]: noBottomBorder ?? checkboxCell,
              [styles.WithoutBottomBorderInset]: noBottomBorderInset,
              [styles.NoPaddingRightCell]: noPaddingRight,
              [styles.NoWrapCell]: noWrap,
              [styles.Currency]: currency,
            })}
            data-tid={checkboxCell ? TableDataTids.checkboxCell : TableDataTids.cell}
            style={{ verticalAlign: vAlign, width, ...style }}
            onClick={onClick}
          >
            {children}
          </td>
        )}
      </CommonWrapper>
    );
  }
);

TableCell.displayName = 'TableCell';
