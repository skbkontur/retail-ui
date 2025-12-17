import React, { forwardRef } from 'react';
import cx from 'classnames';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';

import styles from './Table.module.css';
import { TableDataTids } from './TableDataTids.js';

export interface TableHeaderProps extends CommonProps {
  sticky?: boolean;
}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, sticky, className, ...rest }, ref) => {
    return (
      <thead
        ref={ref}
        className={cx(styles.TableHeader, className, {
          [styles.StickyTableHeader]: sticky,
        })}
        data-tid={TableDataTids.header}
        {...rest}
      >
        {children}
      </thead>
    );
  }
);
TableHeader.displayName = 'TableHeader';
