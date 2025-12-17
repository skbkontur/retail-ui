import React, { forwardRef } from 'react';
import cx from 'classnames';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';

import styles from './Table.module.css';
import { TableDataTids } from './TableDataTids.js';

export interface TableBodyProps extends CommonProps {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <tbody ref={ref} className={cx(styles.TableBody, className)} data-tid={TableDataTids.body} {...rest}>
        {children}
      </tbody>
    );
  }
);
TableBody.displayName = 'TableBody';
