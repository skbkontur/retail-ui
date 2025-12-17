import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  type MouseEventHandler,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import cx from 'classnames';
import type { CommonProps } from '@skbkontur/react-ui/internal/CommonWrapper';

import styles from './Table.module.css';
import { TableDataTids } from './TableDataTids.js';

export interface TableRowProps extends CommonProps {
  onClick?: MouseEventHandler<HTMLTableRowElement>;
  checked?: boolean;
  bottomBorder?: boolean;
  tabIndex?: number;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, onClick, checked, bottomBorder, tabIndex, className, ...rest }, ref) => {
    const internalRef = useRef<HTMLTableRowElement | null>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLTableRowElement, []);

    const rowRef = (node: HTMLTableRowElement | null) => {
      internalRef.current = node;
    };

    const handleClick = (e: MouseEvent<HTMLTableRowElement>) => {
      if (!onClick) {
        return;
      }

      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return;
      }

      onClick(e);
    };

    const computedTabIndex = tabIndex ?? (onClick ? 0 : undefined);
    const onKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        handleClick?.(e as unknown as MouseEvent<HTMLTableRowElement>);
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const currentRow = internalRef.current;
        if (!currentRow) {
          return;
        }

        const tbody = currentRow.closest('tbody');
        if (!tbody) {
          return;
        }

        const rows = Array.from(tbody.querySelectorAll('tr')).filter(
          (row) => row === currentRow || row.tabIndex >= 0
        ) as HTMLTableRowElement[];

        const currentIndex = rows.indexOf(currentRow);
        if (currentIndex === -1) {
          return;
        }

        let targetIndex: number;
        if (e.key === 'ArrowUp') {
          targetIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        } else {
          targetIndex = currentIndex < rows.length - 1 ? currentIndex + 1 : currentIndex;
        }

        if (targetIndex !== currentIndex) {
          rows[targetIndex].focus();
        }
      }
    };

    return (
      <tr
        tabIndex={computedTabIndex}
        ref={rowRef}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        className={cx(styles.TableRow, className, {
          [styles.CheckedRow]: checked,
          [styles.BottomBorder]: bottomBorder,
          [styles.ClickableTableRow]: onClick,
        })}
        data-tid={TableDataTids.row}
        {...rest}
      >
        {children}
      </tr>
    );
  }
);
TableRow.displayName = 'TableRow';
