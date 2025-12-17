import React, { forwardRef } from 'react';
import cx from 'classnames';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';

import styles from './Table.module.css';
import { TableDataTids } from './TableDataTids.js';

export interface TableFooterProps extends CommonProps {
  sticky?: boolean;
}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ children, sticky, className, ...rest }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cx(styles.TableFooter, className, {
          [styles.StickyTableFooter]: sticky,
        })}
        data-tid={TableDataTids.footer}
        {...rest}
      >
        {children}
      </tfoot>
    );
  }
);
TableFooter.displayName = 'TableFooter';
