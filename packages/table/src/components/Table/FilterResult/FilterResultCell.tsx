import cx from 'classnames';
import React, { forwardRef } from 'react';

import { CommonWrapper, type CommonProps, type CommonWrapperRestProps } from '../../../reactUiCompat/CommonWrapper.js';
import { TableDataTids } from '../TableDataTids.js';
import { AppliedFilters } from './AppliedFilters.js';
import type { ITableFilterToken } from './AppliedFilters.js';

import tableStyles from '../Table.module.css';
import styles from './FilterResult.module.css';

export interface IAppliedFiltersProps extends CommonProps {
  tokens: ITableFilterToken[];
  onResetAll: () => void;
  colSpan?: number;
}

export const TableFilterResultCell = forwardRef<HTMLTableCellElement, IAppliedFiltersProps>(
  ({ children, colSpan, ...rest }, ref) => {
    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<IAppliedFiltersProps>) => {
          const { tokens, onResetAll, ...cellRest } = wrapperRest;
          return (
            <td
              colSpan={colSpan ?? 999}
              ref={ref}
              className={cx(tableStyles.TableCell, tableStyles.FilterResultCell, styles.AppliedFilters)}
              data-tid={TableDataTids.filterResultCell}
              {...cellRest}
            >
              {children}
              <AppliedFilters tokens={tokens} onResetAll={onResetAll} />
            </td>
          );
        }}
      </CommonWrapper>
    );
  },
);
TableFilterResultCell.displayName = 'TableFilterResultCell';
