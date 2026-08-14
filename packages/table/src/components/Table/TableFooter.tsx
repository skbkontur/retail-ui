import cx from 'classnames';
import React, { forwardRef } from 'react';

import { CommonWrapper, type CommonProps, type CommonWrapperRestProps } from '../../reactUiCompat/CommonWrapper.js';
import { TableDataTids } from './TableDataTids.js';

import styles from './Table.module.css';

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
  },
);
TableFooter.displayName = 'TableFooter';
