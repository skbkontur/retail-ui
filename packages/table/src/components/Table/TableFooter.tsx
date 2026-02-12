import React, { forwardRef } from 'react';
import cx from 'classnames';
import type { CommonProps, CommonWrapperRestProps } from '@skbkontur/react-ui/internal/CommonWrapper';
import { CommonWrapper } from '@skbkontur/react-ui/internal/CommonWrapper';

import styles from './Table.module.css';
import { TableDataTids } from './TableDataTids.js';

export interface TableFooterProps extends CommonProps, React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean;
}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ children, sticky, className, ...rest }, ref) => {
    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<TableFooterProps>) => (
          <tfoot
            {...wrapperRest}
            ref={ref}
            className={cx(styles.TableFooter, className, {
              [styles.StickyTableFooter]: sticky,
            })}
            data-tid={TableDataTids.footer}
          >
            {children}
          </tfoot>
        )}
      </CommonWrapper>
    );
  }
);
TableFooter.displayName = 'TableFooter';
