import React, { useContext, useCallback, forwardRef, type CSSProperties, type MouseEventHandler } from 'react';
import cx from 'classnames';
import textStyles from '@skbkontur/typography/Text.module.css';
import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';

import { getSizeModifier } from '../../utils/getSizeModifier.js';
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
  contentCompensator?: boolean;
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
      style,
      onClick: onClickProp,
      contentCompensator = true,
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
            className={cx(styles.TableCell, typographyClass, textStyles.noSpacing, className, {
              [styles.CheckboxCell]: checkboxCell,
              [checkboxCellSizeClass]: checkboxCell,
              [tableCellSizeClass]: !checkboxCell,
              [tableCellTextSizeClass]: contentCompensator,
              [styles.NoWrapCell]: noWrap,
              [styles.Currency]: currency,
            })}
            data-tid={checkboxCell ? TableDataTids.checkboxCell : TableDataTids.cell}
            style={{ verticalAlign: vAlign, width, ...style }}
            onClick={onClick}
          >
            <div>{children}</div>
          </td>
        )}
      </CommonWrapper>
    );
  }
);

TableCell.displayName = 'TableCell';
