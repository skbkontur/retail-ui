import React, { forwardRef } from 'react';
import cx from 'classnames';
import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';

import styles from './Table.module.css';
import { TableDataTids } from './TableDataTids.js';

export interface TableBodyProps extends CommonProps, React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<TableBodyProps>) => (
          <tbody {...wrapperRest} ref={ref} className={cx(styles.TableBody, className)} data-tid={TableDataTids.body}>
            {children}
          </tbody>
        )}
      </CommonWrapper>
    );
  }
);
TableBody.displayName = 'TableBody';
