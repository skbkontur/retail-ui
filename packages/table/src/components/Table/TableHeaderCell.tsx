import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';
import cx from 'classnames';
import React, { useContext, forwardRef, type CSSProperties } from 'react';

import { getCheckboxSize } from '../../utils/getCheckboxSize.js';
import { getSizeModifier } from '../../utils/getSizeModifier.js';
import { getTypographyClass } from '../../utils/getTypographyClass.js';
import { SizeTableContext } from './TableContext.js';
import { TableDataTids } from './TableDataTids.js';

import styles from './Table.module.css';

export interface TableHeaderCellBaseProps extends CommonProps {
  scope?: 'col' | 'row';
  colSpan?: number;
  rowSpan?: number;
  width?: CSSProperties['width'];
  vAlign?: CSSProperties['verticalAlign'];
  align?: CSSProperties['textAlign'];
  bottomBorder?: boolean;
  checkboxCell?: boolean;
  /** Скрывает нижнюю границу у ячейки шапки. Автоматически применяется для `checkboxCell`. */
  noBottomBorder?: boolean;
  /** Исключает ячейку из расчёта отступа нижней границы, чтобы она начиналась со следующей ячейки. */
  noBottomBorderInset?: boolean;
  /**
   * Принудительно применяет --table-header-bottom-border-inset из
   * --table-header-bottom-border-inset-size. Нужно на ячейке, которая
   * визуально первая, но не является :nth-child(1 of ...) — например,
   * когда перед ней стоит noPaddingRight-колонка.
   */
  forceBottomBorderInset?: boolean;
  noWrap?: boolean;
  currency?: boolean;
  /**
   * Убирает правый padding у header-ячейки. Парная опция для
   * Table.Cell с тем же пропом — для иконок-индикаторов в первой колонке.
   */
  noPaddingRight?: boolean;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellBaseProps>(
  (
    {
      children,
      colSpan,
      rowSpan,
      width,
      vAlign,
      align,
      bottomBorder,
      checkboxCell,
      noBottomBorder,
      noBottomBorderInset,
      forceBottomBorderInset,
      noWrap,
      currency,
      noPaddingRight = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const isString = typeof children === 'string';
    const { size } = useContext(SizeTableContext);

    const typographyClass = getTypographyClass(size);
    const paddingForSimpleHeaderSizeClass = styles[getSizeModifier('PaddingForSimpleHeader', size)];
    const paddingForHeaderSizeClass = styles[getSizeModifier('PaddingForHeader', size)];
    const checkboxCellSizeClass = styles[getSizeModifier('CheckboxCell', size)];
    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<typeof rest>) => (
          <th
            {...wrapperRest}
            ref={ref}
            style={{
              verticalAlign: vAlign,
              textAlign: align,
              width: width ?? (checkboxCell ? getCheckboxSize(size) : undefined),
              ...style,
            }}
            colSpan={colSpan}
            rowSpan={rowSpan}
            className={cx(styles.TableHeaderCell, typographyClass, paddingForHeaderSizeClass, className, {
              [styles.CheckboxHeaderCell]: checkboxCell,
              [checkboxCellSizeClass]: checkboxCell,
              [styles.PaddingForSimpleHeader]: isString,
              [paddingForSimpleHeaderSizeClass]: isString,
              [styles.BottomBorderInset]: bottomBorder,
              [styles.WithoutBottomBorder]: noBottomBorder ?? checkboxCell,
              [styles.WithoutBottomBorderInset]: noBottomBorderInset,
              [styles.ForceBottomBorderInset]: forceBottomBorderInset,
              [styles.NoPaddingRightCell]: noPaddingRight,
              [styles.NoWrapCell]: noWrap,
              [styles.Currency]: currency,
            })}
            data-tid={checkboxCell ? TableDataTids.headerCheckboxCell : TableDataTids.headerCell}
          >
            {children}
          </th>
        )}
      </CommonWrapper>
    );
  }
);

TableHeaderCell.displayName = 'TableHeaderCell';
