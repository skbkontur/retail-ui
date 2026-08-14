import { globalObject } from '@skbkontur/global-object';
import cx from 'classnames';
import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  type MouseEventHandler,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';

import { CommonWrapper, type CommonProps, type CommonWrapperRestProps } from '../../reactUiCompat/CommonWrapper.js';
import { TableDataTids } from './TableDataTids.js';

import styles from './Table.module.css';

export interface TableRowProps extends CommonProps, React.HTMLAttributes<HTMLTableRowElement> {
  onClick?: MouseEventHandler<HTMLTableRowElement>;
  checked?: boolean;
  /**
   * Рисует нижнюю границу-разделитель под строкой.
   * У последней строки списка граница не отображается (список «открыт» снизу),
   * а при наведении/выделении соседних строк временно скрывается.
   * Отступ границы у первой ячейки можно убрать через `noBottomBorderInset` на ячейке.
   */
  bottomBorder?: boolean;
  tabIndex?: number;
  expanded?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, onClick, checked, bottomBorder, tabIndex, className, expanded, ...rest }, ref) => {
    const internalRef = useRef<HTMLTableRowElement | null>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLTableRowElement, []);

    const rowRef = (node: HTMLTableRowElement | null) => {
      internalRef.current = node;
    };

    const handleClick = (e: MouseEvent<HTMLTableRowElement>) => {
      if (!onClick) {
        return;
      }

      const selection = globalObject.getSelection?.();
      if (selection && selection.toString().length > 0) {
        return;
      }

      onClick(e);
    };

    const computedTabIndex = tabIndex ?? (onClick ? 0 : undefined);

    const focusSiblingRow = (key: 'ArrowUp' | 'ArrowDown') => {
      const currentRow = internalRef.current;
      if (!currentRow) {
        return false;
      }

      const stepKey = key === 'ArrowUp' ? 'previousElementSibling' : 'nextElementSibling';
      let sibling: Element | null = currentRow[stepKey];
      while (sibling) {
        if (sibling instanceof HTMLTableRowElement && sibling.tabIndex >= 0) {
          sibling.focus({ preventScroll: true });
          sibling.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
          return true;
        }
        sibling = sibling[stepKey];
      }
      return false;
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
      const arrowKey: 'ArrowUp' | 'ArrowDown' | null = e.key === 'ArrowUp' || e.key === 'ArrowDown' ? e.key : null;

      if (e.target !== e.currentTarget) {
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        handleClick?.(e as unknown as MouseEvent<HTMLTableRowElement>);
        return;
      }

      if (arrowKey && focusSiblingRow(arrowKey)) {
        e.preventDefault();
      }
    };

    return (
      <CommonWrapper {...rest}>
        {(wrapperRest: CommonWrapperRestProps<TableRowProps>) => (
          <tr
            {...wrapperRest}
            tabIndex={computedTabIndex}
            aria-expanded={expanded}
            ref={rowRef}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            className={cx(styles.TableRow, className, {
              [styles.CheckedRow]: checked,
              [styles.BottomBorder]: bottomBorder,
              [styles.ClickableTableRow]: onClick,
            })}
            data-tid={TableDataTids.row}
          >
            {children}
          </tr>
        )}
      </CommonWrapper>
    );
  },
);
TableRow.displayName = 'TableRow';
