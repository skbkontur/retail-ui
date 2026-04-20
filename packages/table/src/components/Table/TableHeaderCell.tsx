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
import textStyles from '@skbkontur/typography/Text.module.css';

export interface TableHeaderCellBaseProps extends CommonProps {
  scope?: 'col' | 'row';
  colSpan?: number;
  rowSpan?: number;
  width?: CSSProperties['width'];
  vAlign?: CSSProperties['verticalAlign'];
  align?: CSSProperties['textAlign'];
  bottomBorder?: boolean;
  checkboxCell?: boolean;
  noWrap?: boolean;
  currency?: boolean;
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
      noWrap,
      currency,
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
            className={cx(
              styles.TableHeaderCell,
              typographyClass,
              textStyles.noSpacing,
              paddingForHeaderSizeClass,
              className,
              {
                [styles.CheckboxHeaderCell]: checkboxCell,
                [checkboxCellSizeClass]: checkboxCell,
                [styles.PaddingForSimpleHeader]: isString,
                [paddingForSimpleHeaderSizeClass]: isString,
                [styles.BottomBorderInset]: bottomBorder,
                [styles.NoWrapCell]: noWrap,
                [styles.Currency]: currency,
              }
            )}
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
