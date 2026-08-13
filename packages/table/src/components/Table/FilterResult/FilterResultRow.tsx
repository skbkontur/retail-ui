import type { CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';
import cx from 'classnames';
import React, { forwardRef } from 'react';

import { Table } from '../Table.js';
import { TableDataTids } from '../TableDataTids.js';
import type { IAppliedFiltersProps } from './FilterResultCell.js';
import { TableFilterResultCell } from './FilterResultCell.js';

import tableStyles from '../Table.module.css';

export const TableFilterResultRow = forwardRef<HTMLTableRowElement, IAppliedFiltersProps>(
  ({ children, colSpan, ...rest }, ref) => {
    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<IAppliedFiltersProps>) => (
          <Table.Row
            ref={ref}
            className={cx(tableStyles.TableRow, tableStyles.FilterResultRow)}
            data-tid={TableDataTids.filterResultRow}
          >
            <TableFilterResultCell colSpan={colSpan} {...wrapperRest} />
          </Table.Row>
        )}
      </CommonWrapper>
    );
  }
);
TableFilterResultRow.displayName = 'TableFilterResultRow';
