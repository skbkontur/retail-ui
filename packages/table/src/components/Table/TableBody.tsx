import cx from 'classnames';
import React, { forwardRef } from 'react';

import { CommonWrapper, type CommonProps, type CommonWrapperRestProps } from '../../reactUiCompat/CommonWrapper.js';
import { TableDataTids } from './TableDataTids.js';

import styles from './Table.module.css';

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
  },
);
TableBody.displayName = 'TableBody';
