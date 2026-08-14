import cx from 'classnames';
import React, { useContext, forwardRef, type CSSProperties } from 'react';

import type { SortDirection } from '../../hooks/useTableSort.js';
import { CommonWrapper, type CommonProps, type CommonWrapperRestProps } from '../../reactUiCompat/CommonWrapper.js';
import { getCheckboxSize } from '../../utils/getCheckboxSize.js';
import { getSizeModifier } from '../../utils/getSizeModifier.js';
import { getTypographyClass } from '../../utils/getTypographyClass.js';
import { SizeTableContext } from './TableContext.js';
import { TableDataTids } from './TableDataTids.js';

import styles from './Table.module.css';

export interface TableHeaderCellProps extends CommonProps {
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
  noPaddingRight?: boolean;
  sortable?: boolean;
  sortDirection?: SortDirection;
}

const ARIA_SORT_BY_DIRECTION: Record<SortDirection, 'ascending' | 'descending'> = {
  asc: 'ascending',
  desc: 'descending',
};

interface SortableChildProps {
  children?: React.ReactNode;
  sortDirection?: SortDirection;
  'data-tid'?: string;
}

const getTableSortChildState = (
  children: React.ReactNode,
): { hasTableSortChild: boolean; sortDirection?: SortDirection } => {
  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) {
      continue;
    }

    const childProps = child.props as SortableChildProps;
    const childType = child.type as { displayName?: string } | string;
    const isTableSortChild =
      (typeof childType !== 'string' &&
        (childType.displayName === 'TableSort' || childType.displayName === 'TableDropdownSortableFilter')) ||
      childProps['data-tid'] === TableDataTids.sort;

    if (isTableSortChild) {
      return { hasTableSortChild: true, sortDirection: childProps.sortDirection };
    }

    const nestedState = getTableSortChildState(childProps.children);
    if (nestedState.hasTableSortChild) {
      return nestedState;
    }
  }

  return { hasTableSortChild: false };
};

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
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
      sortable,
      sortDirection,
      ...rest
    },
    ref,
  ) => {
    const isString = typeof children === 'string';
    const { size } = useContext(SizeTableContext);

    const typographyClass = getTypographyClass(size);
    const paddingForSimpleHeaderSizeClass = styles[getSizeModifier('PaddingForSimpleHeader', size)];
    const paddingForHeaderSizeClass = styles[getSizeModifier('PaddingForHeader', size)];
    const checkboxCellSizeClass = styles[getSizeModifier('CheckboxCell', size)];

    const tableSortChildState = getTableSortChildState(children);
    const ariaSortDirection = sortDirection ?? tableSortChildState.sortDirection;
    const isSortable = sortable || sortDirection !== undefined || tableSortChildState.hasTableSortChild;
    let ariaSort: 'ascending' | 'descending' | 'none' | undefined;
    if (isSortable) {
      ariaSort = ariaSortDirection ? ARIA_SORT_BY_DIRECTION[ariaSortDirection] : 'none';
    }

    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<typeof rest>) => (
          <th
            {...wrapperRest}
            ref={ref}
            aria-sort={ariaSort}
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
  },
);

TableHeaderCell.displayName = 'TableHeaderCell';
