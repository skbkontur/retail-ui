import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';
import cx from 'classnames';
import React, { forwardRef } from 'react';

import { TableDataTids } from './TableDataTids.js';

import styles from './Table.module.css';

export interface TableHeaderProps extends CommonProps, React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean;
}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, sticky, className, ...rest }, ref) => {
    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<TableHeaderProps>) => (
          <thead
            {...wrapperRest}
            ref={ref}
            className={cx(styles.TableHeader, className, {
              [styles.StickyTableHeader]: sticky,
            })}
            data-tid={TableDataTids.header}
          >
            {children}
          </thead>
        )}
      </CommonWrapper>
    );
  }
);
TableHeader.displayName = 'TableHeader';
